import path from 'node:path';

import type { EnvironmentModuleNode, Plugin } from 'vite';
import { normalizePath } from 'vite';

// 入口 CSS：postcss 在这里执行 @pandacss/dev/postcss，生成最新 utilities。
// 该模块在 moduleGraph 中不依赖任何 panda 源文件，需要手动加入 HMR 更新集合。
const ENTRY_CSS = normalizePath(path.resolve(__dirname, 'src/index.css'));
// panda 配置，变化时需要重新生成 tokens/recipes 产物与 CSS。
const PANDA_CONFIG = normalizePath(path.resolve(__dirname, '../../panda.config.ts'));

// 与 panda.config.ts 的 include 保持一致；styled-system 是 codegen/cssgen 产物目录，
// config 变化时产物会被重写，同样需要重新处理入口 CSS。
const PANDA_WATCH_DIRS = ['src', '../design', '../icons', '../styled-system'].map((dir) =>
  normalizePath(path.resolve(__dirname, dir)),
);

/**
 * 修复 Vite dev 下 panda 样式不随源文件更新（Vite 不会把 postcss 插件注册的
 * dependency 关联到入口 CSS 模块，导致 `index.css` 永不失效）。当 panda 相关
 * 文件变化时，把入口 CSS 模块追加进 HMR 更新集合，触发其重新编译；
 * panda 插件随即重新 extract 并写入最新 utilities。
 */
export const pandaDevHmr = (): Plugin => {
  return {
    name: 'panda-dev-hmr',
    apply: 'serve',
    hotUpdate({ file, server, modules }) {
      const isPandaSource =
        file === PANDA_CONFIG || PANDA_WATCH_DIRS.some((dir) => file.startsWith(dir));
      if (!isPandaSource) {
        return;
      }

      const cssMods = server.environments.client.moduleGraph.getModulesByFile(ENTRY_CSS);
      if (!cssMods) {
        return;
      }
      return [...new Set<EnvironmentModuleNode>([...modules, ...cssMods])];
    },
  };
};
