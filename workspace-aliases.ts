import * as path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname);

// workspace 包自引用（包内组件/模块互引）没有 pnpm 链接可解析，
// vite / vitest / storybook 统一从这里取 alias，避免各处重复声明
export const workspaceAliases = {
  '@bangumi/design': path.join(projectRoot, 'packages/design'),
  '@bangumi/utils': path.join(projectRoot, 'packages/utils'),
  '@bangumi/website': path.join(projectRoot, 'packages/website/src'),
};
