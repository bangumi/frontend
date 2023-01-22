import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import pages from 'vite-plugin-pages';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  let apiDomain = 'https://dev.bgm38.com';

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
      proxy: {
        '/p': {
          target: apiDomain,
          changeOrigin: true,
          configure(proxy) {
            proxy.on('proxyReq', (proxyReq) => {
              if (proxyReq.hasHeader('Origin')) {
                proxyReq.setHeader('Origin', apiDomain);
              }
              proxyReq.setHeader('Referer', apiDomain + '/');
            });
            proxy.on('proxyRes', (proxyRes) => {
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
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/style/utils.less";',
        },
      },
    },
    define: {
      'import.meta.env.__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
    },
  };
});
