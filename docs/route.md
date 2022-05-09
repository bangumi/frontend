# 路由

website 项目使用约定式路由。由 [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) 插件提供路由能力。
路由约定方式选用了 [next.js 式的路由约定](https://nextjs.org/docs/routing/introduction)。

简略来说，`src/pages` 下方的所有组件都会按照路由约定渲染为单独的页面。除了以下情况：

- `components` 中的组件，例如 `src/pages/a-page/components/AwesomeComponents.tsx` 就不会被当成页面渲染；
- 以 `*.spec.ts` / `*.spec.tsx` / `*.test.ts` / `*.test.tsx` 结尾的测试文件；

路由有三种约定：

- Index Routes: `index.tsx` 文件会被当作所含路由的根看待，例如：
  - `src/pages/index.tsx` -> `/`
  - `src/pages/subject/index.tsx` -> `/subject/`
- Nested Routes: 如果页面在文件夹中，页面相对 `src/pages` 的路径会被自动当作路由看待，例如：
  - `src/pages/foo/bar.tsx` -> `/foo/bar`
- Dynamic Routes: 如果文件或者文件夹名用 `[]` 包裹，它将会被当作动态参数，例如：
  - `src/pages/subject/[foo]/bar.tsx` -> `/subject/:foo/bar`
  - `src/pages/foo/[bar].tsx` --> `foo/:bar`
  - 上述参数可以通过 `react-router-dom` 的 `useParams` 获取到。

详细请见 [next.js 式的路由约定](https://nextjs.org/docs/routing/introduction)。
