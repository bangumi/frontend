import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport from 'vite-plugin-style-import'
import svgr from 'vite-plugin-svgr'
import pages from 'vite-plugin-pages'

export default defineConfig({
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
          resolveStyle: (name: string) => !name.includes('Item') ? `@bangumi/design/components/${name}/style/index.tsx` : ''
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${require.resolve('@bangumi/design')}/theme/variables.less;"`
      }
    }
  },
  define: {
    'import.meta.env.__APP_VERSION__': JSON.stringify(process.env.npm_package_version)
  }
})
