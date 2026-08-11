import * as fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';

import { chromium } from '@playwright/test';
import { preview } from 'vite';

const DEFAULT_ROUTE = '/';
const DEFAULT_OUTPUT = '/tmp/website-screenshot.jpg';
const WAIT_UNTIL_VALUES = new Set(['commit', 'domcontentloaded', 'load', 'networkidle']);
const invocationDirectory = process.env.INIT_CWD ?? process.cwd();
const websiteDirectory = path.resolve(import.meta.dirname, '..');
const viteConfigPath = path.join(websiteDirectory, 'vite.config.ts');
const distIndexPath = path.join(websiteDirectory, 'dist', 'index.html');
const fixturesDirectory = path.join(websiteDirectory, 'src', 'mocks', 'fixtures');

const HELP = `
Capture a built website page with Playwright.

Usage:
  pnpm website screenshot [route] [output] [options]

Arguments:
  route                       Website route (default: ${DEFAULT_ROUTE})
  output                      JPEG output path; only .jpg/.jpeg is supported
                              (default: ${DEFAULT_OUTPUT})

Options:
  -u, --url <route>           Website route; overrides the positional route
  -o, --output <path>         Output path; overrides the positional output
      --mode <mode>           Vite mode used to configure the API proxy (default: production)
      --width <pixels>        Viewport width (default: 1440)
      --height <pixels>       Viewport height (default: 900)
      --device-scale-factor   Device scale factor (default: 1)
      --quality <0-100>       JPEG quality (default: 60)
      --full-page             Capture the full scrollable page; mutually exclusive
                              with --element
      --element <selector>    Capture only the element matching the CSS selector
                              (e.g. --element '#user-avatar') instead of the whole
                              page; the element is scrolled into view and captured
                              at its natural size
      --wait-until <state>    commit, domcontentloaded, load, or networkidle
                              (default: domcontentloaded)
      --wait-for <selector>   Wait for a selector to become visible
      --hover <selector>      Hover an element before capture; repeatable
      --wait-ms <ms>          Additional delay after loading (default: 1000)
      --timeout <ms>          Navigation and selector timeout (default: 60000)
      --storage-state <path>  Playwright storage-state JSON for authentication
      --local-storage <k=v>   Set local storage before navigation; repeatable
      --use-fixtures          Intercept /p1 API requests with local JSON fixtures from
                              src/mocks/fixtures (fixture named <pathname>-<METHOD>.json);
                              requests without a matching fixture fall through to the
                              API proxy
  -h, --help                  Show this help

Examples:
  pnpm run build
  pnpm website screenshot /user/sai /tmp/user.jpg --full-page
  pnpm website screenshot /user/sai /tmp/avatar.jpg --element '#user-avatar'
  pnpm website screenshot /subject/12 /tmp/episode.jpg --hover '[title^="ep.1 "]'
  pnpm website screenshot --wait-for main --local-storage view=grid
`;

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    url: { type: 'string', short: 'u' },
    output: { type: 'string', short: 'o' },
    mode: { type: 'string', default: 'production' },
    width: { type: 'string', default: '1440' },
    height: { type: 'string', default: '900' },
    'device-scale-factor': { type: 'string', default: '1' },
    quality: { type: 'string', default: '60' },
    'full-page': { type: 'boolean', default: false },
    element: { type: 'string' },
    'wait-until': { type: 'string', default: 'domcontentloaded' },
    'wait-for': { type: 'string' },
    hover: { type: 'string', multiple: true, default: [] },
    'wait-ms': { type: 'string', default: '1000' },
    timeout: { type: 'string', default: '60000' },
    'storage-state': { type: 'string' },
    'local-storage': { type: 'string', multiple: true, default: [] },
    'use-fixtures': { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (values.help) {
  process.stdout.write(HELP);
  process.exit(0);
}

if (positionals.length > 2) {
  throw new Error(`Expected at most two positional arguments.\n${HELP}`);
}

function parsePositiveNumber(value, name, { allowZero = false, integer = false } = {}) {
  const parsed = Number(value);
  const valid =
    Number.isFinite(parsed) &&
    (allowZero ? parsed >= 0 : parsed > 0) &&
    (!integer || Number.isInteger(parsed));
  if (!valid) {
    const range = allowZero ? 'a non-negative' : 'a positive';
    throw new Error(`${name} must be ${range} ${integer ? 'integer' : 'number'}`);
  }
  return parsed;
}

function parseLocalStorage(entries) {
  return entries.map((entry) => {
    const separator = entry.indexOf('=');
    if (separator <= 0) {
      throw new Error(`Invalid --local-storage value "${entry}"; expected key=value`);
    }
    return [entry.slice(0, separator), entry.slice(separator + 1)];
  });
}

/** 按 mocks/utils.ts 的命名约定加载 JSON fixture；无匹配文件时返回 undefined */
async function loadFixture(pathname, method) {
  const fixturePath = path.join(fixturesDirectory, `${pathname}-${method.toUpperCase()}.json`);
  try {
    await fs.access(fixturePath);
  } catch {
    return undefined;
  }
  return JSON.parse(await fs.readFile(fixturePath, 'utf8'));
}

/**
 * RAII 式资源管理：作用域结束（含异常路径）后按逆序释放所有 asyncDisposable 资源。
 * 单个资源的释放失败只记录日志，不影响其余资源释放，也不会覆盖主流程异常。
 */
async function withDisposables(disposables, fn) {
  try {
    return await fn();
  } finally {
    for (const disposable of [...disposables].reverse()) {
      try {
        await disposable[Symbol.asyncDispose]();
      } catch (error) {
        console.error(`Failed to dispose resource: ${error.message}`);
      }
    }
  }
}

function getRoute(value) {
  if (!value.includes('://')) {
    return value.startsWith('/') ? value : `/${value}`;
  }

  const url = new URL(value);
  if (!['127.0.0.1', '::1', 'localhost'].includes(url.hostname)) {
    throw new Error('The screenshot route must be a path within the built website');
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

const route = getRoute(values.url ?? positionals[0] ?? DEFAULT_ROUTE);
const output = path.resolve(invocationDirectory, values.output ?? positionals[1] ?? DEFAULT_OUTPUT);
if (!/\.jpe?g$/i.test(output)) {
  throw new Error(
    `Only JPEG output is supported; the output path must end in .jpg or .jpeg: ${output}`,
  );
}
const width = parsePositiveNumber(values.width, '--width', { integer: true });
const height = parsePositiveNumber(values.height, '--height', { integer: true });
const deviceScaleFactor = parsePositiveNumber(
  values['device-scale-factor'],
  '--device-scale-factor',
);
const quality = parsePositiveNumber(values.quality, '--quality', {
  allowZero: true,
  integer: true,
});
if (quality > 100) {
  throw new Error('--quality must be between 0 and 100');
}
const waitMs = parsePositiveNumber(values['wait-ms'], '--wait-ms', {
  allowZero: true,
  integer: true,
});
const timeout = parsePositiveNumber(values.timeout, '--timeout', { integer: true });
const waitUntil = values['wait-until'];
const localStorageEntries = parseLocalStorage(values['local-storage']);

if (!WAIT_UNTIL_VALUES.has(waitUntil)) {
  throw new Error(`--wait-until must be one of: ${[...WAIT_UNTIL_VALUES].join(', ')}`);
}

if (values.element && values['full-page']) {
  throw new Error('--element and --full-page are mutually exclusive');
}

try {
  await fs.access(distIndexPath);
} catch {
  throw new Error(
    'Built website assets are missing. Run "pnpm run build" before taking a screenshot.',
  );
}

await fs.mkdir(path.dirname(output), { recursive: true });

const previewServer = await preview({
  root: websiteDirectory,
  configFile: viteConfigPath,
  envDir: websiteDirectory,
  mode: values.mode,
  logLevel: 'error',
  preview: {
    host: '127.0.0.1',
    port: 0,
    strictPort: true,
  },
});

const address = previewServer.httpServer.address();
if (!address || typeof address === 'string') {
  await previewServer.close();
  throw new Error('Could not determine the temporary preview server address');
}

const url = new URL(route, `http://127.0.0.1:${address.port}/`).href;

/** 需随作用域结束释放的资源；browser 在启动后动态加入 */
const disposables = [
  {
    [Symbol.asyncDispose]: () =>
      Promise.race([previewServer.close(), new Promise((resolve) => setTimeout(resolve, 2000))]),
  },
];

let exitCode = 0;
try {
  await withDisposables(disposables, async () => {
    const browser = await chromium.launch();
    disposables.push({ [Symbol.asyncDispose]: () => browser.close() });
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor,
      storageState: values['storage-state']
        ? path.resolve(invocationDirectory, values['storage-state'])
        : undefined,
    });
    const page = await context.newPage();

    page.on('console', (message) => {
      if (message.type() === 'error') {
        console.error(`CONSOLE ERROR: ${message.text()}`);
      }
    });
    page.on('pageerror', (error) => console.error(`PAGE ERROR: ${error.message}`));

    if (localStorageEntries.length > 0) {
      await page.addInitScript((entries) => {
        for (const [key, value] of entries) {
          localStorage.setItem(key, value);
        }
      }, localStorageEntries);
    }

    if (values['use-fixtures']) {
      await page.route(
        (url) => url.pathname.startsWith('/p1/'),
        async (route) => {
          const { pathname } = new URL(route.request().url());
          let fixture;
          try {
            fixture = await loadFixture(pathname, route.request().method());
          } catch (error) {
            console.error(`Failed to load fixture for ${pathname}: ${error.message}`);
            return route.abort();
          }
          if (fixture === undefined) {
            // 未匹配的 API 请求直接失败，避免透传到真实后端导致行为不可复现或挂起
            return route.abort();
          }
          return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fixture),
          });
        },
      );
    }

    await page.goto(url, { waitUntil, timeout });
    if (values['wait-for']) {
      await page.locator(values['wait-for']).waitFor({ state: 'visible', timeout });
    }
    if (waitMs > 0) {
      await page.waitForTimeout(waitMs);
    }
    for (const selector of values.hover) {
      await page.locator(selector).hover({ timeout });
    }

    if (values.element) {
      const element = page.locator(values.element);
      await element.waitFor({ state: 'visible', timeout });
      await element.screenshot({
        path: output,
        type: 'jpeg',
        quality,
        animations: 'disabled',
        caret: 'hide',
      });
    } else {
      await page.screenshot({
        path: output,
        type: 'jpeg',
        quality,
        fullPage: values['full-page'],
        animations: 'disabled',
        caret: 'hide',
      });
    }
    console.log(`Screenshot saved to ${output}`);
  });
} catch (error) {
  exitCode = 1;
  console.error(error);
} finally {
  // vite 加载 TS 配置文件时启动的 esbuild service 未被释放，会阻止进程自然退出，
  // 因此在资源清理完成后显式退出
  process.exit(exitCode);
}
