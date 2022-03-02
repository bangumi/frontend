import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport from 'vite-plugin-style-import'
import reactSVGPlugin from 'vite-plugin-react-svg'

export default defineConfig({
  plugins: [
    react(),
    reactSVGPlugin(),
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
  ]
})
