# AGENTS.md

## 项目概览

这是 Bangumi 新前端项目，使用 React、TypeScript、Vite 和 pnpm workspace。
项目要求 Node.js `>=22`，包管理器固定为 pnpm `11.21.0`（见根 `package.json` 的 `packageManager` 字段）。

主要 workspace：

- `packages/website`：主网站应用，页面、hooks、路由、样式和端到端测试。
- `packages/design`：共享设计组件和 Storybook 文档。
- `packages/icons`：共享 React 图标组件及 SVG 资源。
- `packages/utils`：wiki、BBCode 等共享工具和解析逻辑。
- `packages/client`：由 OpenAPI 生成的 API client 及其生成脚本。
- `packages/server`：服务端 workspace。
- `tests`：Vitest 全局 setup、网站测试配置和测试 mock。
- `docs`：路由、CSS 命名和代码风格等项目文档。

### Workspace 布局

- `pnpm-workspace.yaml` 声明 `packages: ['packages/*']`；根 `package.json` 只放根级共享
  devDependencies 和汇总脚本，各包依赖声明在各自 `package.json`。
- pnpm 采用非提升（isolated）依赖布局：包的依赖安装在各包自己的 `node_modules`（经
  `.pnpm` store 链接），根目录 `node_modules` 不含各包依赖。Node 模块解析从脚本文件
  所在目录向上查找，因此独立脚本只能解析它所在 workspace 包声明过的依赖。
- 例如 `@playwright/test` 是 `packages/website` 的 devDependency：在仓库根目录写
  `import { chromium } from '@playwright/test'` 会报 `ERR_MODULE_NOT_FOUND`，脚本放在
  `packages/website` 下才能解析成功。

## 开发命令

在仓库根目录执行命令。首次开发先运行 `pnpm install`。

```bash
pnpm dev                 # 启动 website 开发服务器，使用测试后端
pnpm dev --mode production # 使用生产后端，除非必要不要使用
pnpm build               # 构建 website
pnpm test                # 运行 Vitest
pnpm test:e2e            # 运行 website Playwright 测试
pnpm lint                # ESLint
pnpm lint:style          # CSS/Less Stylelint
pnpm type-check          # TypeScript 类型检查
pnpm prettier:check      # 检查 Prettier 格式
```

可使用 workspace 脚本定向执行任务，例如 `pnpm website build`、`pnpm utils test`、
`pnpm design dev`。修改共享组件时，必要时运行 `pnpm design:doc` 查看 Storybook。

除非用户明确要求，否则不得启动开发服务器、预览服务器、watcher 或任何会持续运行的后台进程。
需要验证代码效果时，可以使用仓库内的 Playwright、截图工具，或由验证流程临时启动并在完成后
立即关闭的 Vite preview；优先使用执行完成后会自行退出的构建、测试或截图命令，不得遗留后台
进程。

### 编写和运行 Playwright 脚本

- 截图、视觉对比、按截图实现/修复 UI 等任务遵循 `playwright-visual-implementation`
  skill（`.agents/skills/playwright-visual-implementation/SKILL.md`）：优先使用仓库截图
  CLI `pnpm website screenshot`（`packages/website/scripts/screenshot.mjs`），先
  `pnpm run build`，它再启动用完即关的临时 Vite preview。该脚本是 agent 可按需修改的
  截图工具：CLI 选项不足以表达目标状态（点击、表单输入、等待某个元素出现/消失）时，
  直接往脚本里加对应步骤（如新增可重复的 `--click <selector>` 选项），改完仍用
  `pnpm website screenshot` 运行，不要另起炉灶写临时脚本。
- 确需独立临时 Playwright 脚本时（不便改动仓库文件等场景），放在
  `packages/website/scripts/` 下、用 `pnpm website <script>`（即
  `pnpm --filter=@bangumi/website run <script>`）运行，并参照 `scripts/screenshot.mjs`
  处理路径：`pnpm website` 运行时 cwd 是该包目录，取用户调用目录用
  `process.env.INIT_CWD ?? process.cwd()`，定位仓库内文件基于 `import.meta.dirname`
  相对推算。
- `@playwright/test` 已由项目声明为 `packages/website` 的 devDependency，`pnpm install`
  后即可 import；chromium 浏览器由用户环境预先安装。agent **不得自行安装** playwright
  或其浏览器，不要运行 `pnpm add`、`npm install`、`playwright install`、
  `pnpm website install-playwright-deps` 等命令；缺依赖或浏览器时报环境问题即可。
- 脚本 import playwright 能否成功取决于文件位置（见上文 Workspace 布局）：放在
  `packages/website/` 内才能 `import { chromium } from '@playwright/test'`；放在仓库
  根目录会报 `ERR_MODULE_NOT_FOUND`。这是布局问题而非依赖缺失，不要因此安装依赖或
  往根 `package.json` 添加依赖，把脚本放进 `packages/website/` 内即可。
- 临时跑 Playwright CLI（如指定单个 spec 或加参数）可用
  `pnpm website exec playwright test <args>`，config 默认取
  `packages/website/playwright.config.ts`；日常跑 e2e 用 `pnpm test:e2e`。

## 代码约定

- 使用 TypeScript；React 组件使用函数组件和项目现有 hooks/组件模式。
- 遵循根目录 Prettier 配置：单引号、JSX 单引号、分号、尾随逗号、行宽 100。
- ESLint 会检查未使用导入、导入顺序、Node 内置模块的 `node:` 协议、TypeScript 类型导入等。
  保持导入分组和 `simple-import-sort` 可通过，不要用禁用规则掩盖问题。
- 新代码和新样式使用 Panda CSS，并从 `@bangumi/styled-system` 导入类型化样式 API。现有 Less
  和 CSS Modules 保持可用并逐步迁移；修改存量样式时沿用其 CSS Modules 或 BEM 命名约定。
- 注释只写必要的设计或行为说明。函数、变量、类的文档使用 TSDoc `/** ... */`，不要用
  `//` 代替可被 TypeScript 工具识别的文档注释，也不要在 TSDoc 中重复 TypeScript 类型。
- 优先复用 `@bangumi/design`、`@bangumi/icons`、`@bangumi/utils` 和现有 hooks；新增跨页面
  能力前先确认是否应放入对应 shared workspace。
- 保持改动范围聚焦，不提交构建产物、依赖目录或无关格式化变更。

## Website 约定

- 在 `packages/website/src/routes.tsx` 显式注册路由。页面组件位于
  `packages/website/src/pages`；使用 `[param]` 命名的页面目录时，路由表中对应为 `:param`。
  嵌套路由需要与页面中的 `Outlet` 保持一致。
- 实现 UI 时遵循从大到小、先整体后细节的顺序：优先搭建整体布局和页面结构，保证组件树与
  语义结构完整，再逐层细化每个区域的具体实现与样式细节。
- 单元测试不得请求真实 API。使用 MSW，并在 `packages/website/src/mocks/handlers.ts` 注册
  handler；`mockAPI` 对应的响应 fixture 放在 `packages/website/src/mocks/fixtures`，文件名遵循
  `<path>-<METHOD>.json`。
- 修改新特性或缺陷修复时同时补充测试；涉及用户流程时优先补 Vitest/Testing Library，必要时
  补 Playwright 端到端测试。

## 生成文件和 API client

`packages/client/client.ts`、`packages/client/types` 等 API 产物由 OpenAPI 脚本生成，不要手工
编辑。需要更新 API 时使用 `pnpm client update-openapi && pnpm client build`，并检查生成差异。

Panda CSS 生成的 `packages/styled-system` 目录（包括 `styles.css`）是需要提交的仓库产物。修改
Panda 样式或配置后运行 `pnpm panda:codegen && pnpm panda:cssgen`，检查并提交生成差异，不要将其
加入忽略规则。

## 验证和提交

提交前至少运行与改动相关的测试、`pnpm lint`、`pnpm type-check` 和格式检查；UI 或样式改动
还应运行 `pnpm lint:style`，网站构建改动应运行 `pnpm build`。测试或检查因环境、后端或浏览器
依赖无法运行时，在提交说明中明确记录原因。

PR 标题遵循 Conventional Commits；新特性和缺陷修复必须包含测试。`packages/design` 新增
组件必须包含 Storybook story。详细贡献流程见 `CONTRIBUTING.md`，具体风格见 `docs/` 下文档。

## 文档查询

当任务涉及库、框架、SDK、API、CLI 工具或云服务的用法、配置、迁移或调试时，先使用 Context7
获取当前官方文档：先 `resolve-library-id`，再用选定的库 ID 调用 `query-docs`；若答案不足，
对同一库使用 `researchMode: true` 重试。重构、业务逻辑调试、代码审查和一般编程概念不需要
调用 Context7。
