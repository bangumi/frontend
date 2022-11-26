import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import pages from 'vite-plugin-pages';
import styleImport from 'vite-plugin-style-import';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const apiDomain = mode === 'stage' ? 'https://dev.bgm38.com' : 'https://next.bgm.tv';
  console.log('using backend', apiDomain);

  return {
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
              proxyReq.setHeader('Referer', apiDomain);
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
      react(),
      svgr(),
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
      styleImport({
        libs: [
          {
            libraryName: '@bangumi/design',
            libraryNameChangeCase: 'pascalCase',
            ensureStyleFile: true,
            resolveStyle: (name: string) => `@bangumi/design/components/${name}/style/index.tsx`,
          },
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
