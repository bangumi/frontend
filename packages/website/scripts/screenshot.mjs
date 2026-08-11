import * as fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';

import { chromium } from '@playwright/test';
import { preview } from 'vite';

const DEFAULT_ROUTE = '/';
const DEFAULT_OUTPUT = '/tmp/website-screenshot.png';
const WAIT_UNTIL_VALUES = new Set(['commit', 'domcontentloaded', 'load', 'networkidle']);
const invocationDirectory = process.env.INIT_CWD ?? process.cwd();
const websiteDirectory = path.resolve(import.meta.dirname, '..');
const viteConfigPath = path.join(websiteDirectory, 'vite.config.ts');
const distIndexPath = path.join(websiteDirectory, 'dist', 'index.html');

const HELP = `
Capture a built website page with Playwright.

Usage:
  pnpm website screenshot [route] [output] [options]

Arguments:
  route                       Website route (default: ${DEFAULT_ROUTE})
  output                      PNG output path (default: ${DEFAULT_OUTPUT})

Options:
  -u, --url <route>           Website route; overrides the positional route
  -o, --output <path>         Output path; overrides the positional output
      --mode <mode>           Vite mode used to configure the API proxy (default: production)
      --width <pixels>        Viewport width (default: 1440)
      --height <pixels>       Viewport height (default: 900)
      --device-scale-factor   Device scale factor (default: 1)
      --full-page             Capture the full scrollable page
      --wait-until <state>    commit, domcontentloaded, load, or networkidle
                              (default: domcontentloaded)
      --wait-for <selector>   Wait for a selector to become visible
      --wait-ms <ms>          Additional delay after loading (default: 1000)
      --timeout <ms>          Navigation and selector timeout (default: 60000)
      --storage-state <path>  Playwright storage-state JSON for authentication
      --local-storage <k=v>   Set local storage before navigation; repeatable
  -h, --help                  Show this help

Examples:
  pnpm run build
  pnpm website screenshot /user/sai /tmp/user.png --full-page
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
    'full-page': { type: 'boolean', default: false },
    'wait-until': { type: 'string', default: 'domcontentloaded' },
    'wait-for': { type: 'string' },
    'wait-ms': { type: 'string', default: '1000' },
    timeout: { type: 'string', default: '60000' },
    'storage-state': { type: 'string' },
    'local-storage': { type: 'string', multiple: true, default: [] },
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
const width = parsePositiveNumber(values.width, '--width', { integer: true });
const height = parsePositiveNumber(values.height, '--height', { integer: true });
const deviceScaleFactor = parsePositiveNumber(
  values['device-scale-factor'],
  '--device-scale-factor',
);
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
let browser;
try {
  browser = await chromium.launch();
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

  await page.goto(url, { waitUntil, timeout });
  if (values['wait-for']) {
    await page.locator(values['wait-for']).waitFor({ state: 'visible', timeout });
  }
  if (waitMs > 0) {
    await page.waitForTimeout(waitMs);
  }

  await page.screenshot({
    path: output,
    fullPage: values['full-page'],
    animations: 'disabled',
    caret: 'hide',
  });
  console.log(`Screenshot saved to ${output}`);
} finally {
  await browser?.close();
  await previewServer.close();
}
