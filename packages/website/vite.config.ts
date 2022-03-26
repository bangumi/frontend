import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport from 'vite-plugin-style-import'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
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
  define: {
    'import.meta.env.__APP_VERSION__': JSON.stringify(process.env.npm_package_version)
  }
})
