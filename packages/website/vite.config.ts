import { execSync } from 'node:child_process';
import * as crypto from 'node:crypto';
import path from 'node:path';

import react from '@vitejs/plugin-react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ProxyAgent } from 'proxy-agent';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

import { version } from '../../package.json';
import { pandaDevHmr } from './panda-dev-hmr';

let COMMIT_HASH = '';
let VERSION = '';

try {
  COMMIT_HASH = execSync('git rev-parse --short HEAD').toString().trim();
} catch {
  console.log('failed to get git info');
}

// 版本号优先使用 CI 注入的 VERSION（release 流程先构建后打 tag，git describe 拿不到本次版本），
// 其次使用最近的 git tag（本地 / preview 构建），最后 fallback 到 package.json version。
try {
  VERSION =
    process.env.VERSION?.trim() ||
    execSync('git describe --tags --abbrev=0', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
} catch {
  console.log('failed to get version from git, fallback to package.json version');
}

dayjs.extend(utc);
const BUILD_TIME = dayjs().utc().format();
const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';
const TURNSTILE_PRODUCTION_SITE_KEY = '0x4AAAAAAABkMYinukE8nzYS';

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, __dirname, '');
  const httpProxy = environment.HTTP_PROXY ?? environment.http_proxy;
  const httpsProxy = environment.HTTPS_PROXY ?? environment.https_proxy ?? httpProxy;
  let apiDomain = 'https://next.bgm.tv';

  if (mode === 'loc') {
    apiDomain = 'http://127.0.0.1:4000';
  } else if (mode === 'production') {
    apiDomain = 'https://next.bgm.tv';
  }

  console.log('using backend', apiDomain);

  const access_token = environment.ACCESS_TOKEN;
  const turnstileSiteKey =
    mode === 'production' ? TURNSTILE_PRODUCTION_SITE_KEY : TURNSTILE_TEST_SITE_KEY;
  const proxyAgent = new ProxyAgent({
    getProxyForUrl: (url) => (new URL(url).protocol === 'https:' ? httpsProxy : httpProxy) ?? '',
  });

  return {
    build: {
      sourcemap: true,
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.code === 'INVALID_ANNOTATION' &&
            warning.id?.includes('react-helmet-async/lib/index.module.js')
          ) {
            return;
          }

          warn(warning);
        },
      },
    },
    resolve: {
      alias: {
        '@bangumi/website': path.resolve(__dirname, './src'),
      },
    },
    server: {
      watch: {
        ignored: ['playwright-report'],
      },
      proxy: {
        '/p1': {
          target: apiDomain,
          headers: {
            ...(access_token ? { authorization: `Bearer ${access_token}` } : {}),
            // 浏览器发出的 Referer 指向 localhost，改写为 API 域名以贴近生产环境。
            // 必须在 headers 里设置：走 ProxyAgent 时 proxyReq 事件触发时请求头已发送
            // （headersSent 为 true），在其中 setHeader 会抛 ERR_HTTP_HEADERS_SENT
            referer: `${apiDomain}/`,
          },
          changeOrigin: true,
          rewriteWsOrigin: true,
          toProxy: true,
          agent: proxyAgent,
          ws: true,
          configure(proxy) {
            proxy.on('proxyRes', (proxyRes) => {
              proxyRes.headers['cf-ray'] =
                proxyRes.headers['cf-ray'] ?? ('fake-' + crypto.randomUUID()).slice(0, 20);
              // 本地开发环境没有 https 带有 secure attribute 的 set-cookies 无效，
              // 所以在本地开发时移除 secure attribute
              const setCookies = proxyRes.headers['set-cookie'];
              if (Array.isArray(setCookies)) {
                proxyRes.headers['set-cookie'] = setCookies.map((sc) => {
                  return sc
                    .split(';')
                    .filter((v) => v.trim().toLowerCase() !== 'secure')
                    .join('; ');
                });
              }
            });
          },
        },
      },
    },
    plugins: [
      pandaDevHmr(),
      react(
        mode === 'production'
          ? {
              babel: {
                plugins: ['babel-plugin-jsx-remove-data-test-id'],
              },
            }
          : undefined,
      ),
      svgr({
        include: '**/*.svg',
        svgrOptions: {
          exportType: 'named',
          namedExport: 'ReactComponent',
          titleProp: true,
        },
      }),
    ],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      // Compile less in the main thread instead of worker threads: Vite's CSS
      // preprocessor workers wait on a 5s synchronous lock for the main process
      // to resolve imports, which intermittently times out
      // ("[vite:css] [less] timed-out") on CPU-contended CI runners.
      preprocessorMaxWorkers: 0,
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/style/index.less";',
        },
      },
    },
    define: {
      'import.meta.env.VITE_TURNSTILE_SITE_KEY': JSON.stringify(turnstileSiteKey),
      'import.meta.env.__APP_VERSION__': JSON.stringify(VERSION || version),
      'import.meta.env.__COMMIT_HASH__': JSON.stringify(COMMIT_HASH),
      'import.meta.env.__BUILT_TIME__': JSON.stringify(BUILD_TIME),
    },
  };
});
