import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport from 'vite-plugin-style-import'
import svgr from 'vite-plugin-svgr'
import pages from 'vite-plugin-pages'

const privateAPIDomain = 'https://next.bgm.tv'
const devDomain = 'http://dev.bgm.tv:3000'

export default defineConfig({
  server: {
    proxy: {
      '/p': {
        target: privateAPIDomain,
        changeOrigin: true,
        configure (proxy) {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Origin', privateAPIDomain)
          })
        },
        cookieDomainRewrite: {
          [privateAPIDomain]: devDomain
        }
      }
    }
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
        '**/*.test.tsx'
      ]
    }),
    styleImport({
      libs: [
        {
          libraryName: '@bangumi/design',
          libraryNameChangeCase: 'capitalCase',
          ensureStyleFile: true,
          resolveStyle: (name: string) => `@bangumi/design/components/${name}/style/index.tsx`
        }
      ]
    })
  ],
  define: {
    'import.meta.env.__APP_VERSION__': JSON.stringify(process.env.npm_package_version)
  }
})
