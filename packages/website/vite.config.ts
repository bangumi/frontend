import { execSync } from 'node:child_process';
import * as crypto from 'node:crypto';
import path from 'node:path';

import react from '@vitejs/plugin-react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { defineConfig } from 'vite';
import pages from 'vite-plugin-pages';
import svgr from 'vite-plugin-svgr';

import { version } from '../../package.json';

let COMMIT_HASH = '';

try {
  COMMIT_HASH = execSync('git rev-parse --short HEAD').toString();
} catch {
  console.log('failed to get git info');
}

dayjs.extend(utc);
const BUILD_TIME = dayjs().utc().format();

export default defineConfig(({ mode }) => {
  let apiDomain = 'https://next.bgm38.com';

  if (mode === 'loc') {
    apiDomain = 'http://127.0.0.1:4000';
  } else if (mode === 'production') {
    apiDomain = 'https://next.bgm.tv';
  }

  console.log('using backend', apiDomain);

  return {
    build: {
      sourcemap: true,
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
        '/p': {
          target: apiDomain,
          changeOrigin: true,
          ws: true,
          configure(proxy) {
            proxy.on('proxyReq', (proxyReq) => {
              if (proxyReq.hasHeader('Origin')) {
                proxyReq.setHeader('Origin', apiDomain);
              }
              proxyReq.setHeader('Referer', apiDomain + '/');
            });
            proxy.on('proxyRes', (proxyRes) => {
              const h = proxyRes.headers['cf-ray'] ?? '';
              if (h === '') {
                proxyRes.headers['cf-ray'] = ('fake-' + crypto.randomUUID()).slice(0, 20);
              } else if (Array.isArray(h)) {
                proxyRes.headers['cf-ray'] = h[0] ?? ('fake-' + crypto.randomUUID()).slice(0, 20);
              }
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
      react(
        mode === 'production'
          ? {
              babel: {
                plugins: ['babel-plugin-jsx-remove-data-test-id', 'lodash'],
              },
            }
          : undefined,
      ),
      svgr({
        svgrOptions: {
          titleProp: true,
        },
      }),
      pages({
        extensions: ['tsx'],
        importMode: 'async',
        exclude: [
          '**/components/**/*.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/*.test.ts',
          '**/*.test.tsx',
        ],
      }),
    ],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/style/index.less";',
        },
      },
    },
    define: {
      'import.meta.env.__APP_VERSION__': JSON.stringify(version),
      'import.meta.env.__COMMIT_HASH__': JSON.stringify(COMMIT_HASH),
      'import.meta.env.__BUILT_TIME__': JSON.stringify(BUILD_TIME),
    },
  };
});
