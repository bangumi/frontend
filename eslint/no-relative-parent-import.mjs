// TODO: remove this after https://github.com/import-js/eslint-plugin-import/issues/2467 is fixed

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as posix from 'node:path/posix';

import { ESLintUtils } from '@typescript-eslint/utils';

const projectRoot = posix.normalize(path.dirname(import.meta.dirname));

const EXT_ORDER = ['.ts', '.tsx', '.js', '.mjs', '.cjs', '.mts', '.cts'];
const INDEX_ORDER = ['index.ts', 'index.tsx', 'index.js', 'index.mjs', 'index.cjs'];

function addExt(abs) {
  // 与 node/TS/vite 解析一致：先补扩展名（文件优先），再找目录 index
  const fileHit = EXT_ORDER.find((e) => fs.existsSync(abs + e));
  if (fileHit) {
    return abs + fileHit;
  }
  if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) {
    const idx = INDEX_ORDER.find((e) => fs.existsSync(path.join(abs, e)));
    if (idx) {
      return path.join(abs, idx);
    }
  }
  return null;
}

const createRule = ESLintUtils.RuleCreator((name) => name);

export default createRule({
  name: 'no-relative-parent-import',
  meta: {
    type: 'problem',
    docs: {
      recommended: 'error',
      suggestion: true,
      requiresTypeChecking: false,
      description: 'forbidden relative parent import',
    },
    schema: [],
    messages: {
      import: "do not use relative parent import, use '{{ should }}' instead",
    },
  },
  defaultOptions: [],

  create: (context) => {
    const filename = context.filename;
    return {
      ImportDeclaration: (node) => {
        if (!node.source.value.startsWith('..')) {
          return;
        }

        const importPath = path.resolve(path.dirname(filename), node.source.value);
        const file = addExt(importPath);
        if (!file) {
          return;
        }

        const rel = path.relative(projectRoot, file).replaceAll('\\', '/');
        // 只约束 workspace 包内的导入；根级脚本（如 .github/scripts）导入根文件保持相对路径
        if (!rel.startsWith('packages/')) {
          return;
        }

        const should = rel.startsWith('packages/website/')
          ? posix.join('@bangumi/website', rel.slice('packages/website/'.length))
          : posix.join('@bangumi', rel.slice('packages/'.length));

        context.report({
          node,
          messageId: 'import',
          data: { should },
        });
      },
    };
  },
});
