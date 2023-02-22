import * as path from 'node:path';

import { rules } from './rules';

const pattern = /.*\.spec\.(?<ext>[tj]sx?)$/;

export default rules({
  name: 'test-file-pattern',
  meta: {
    type: 'problem',
    docs: {
      recommended: 'error',
      requiresTypeChecking: false,
      description: 'forbidden .spec test file pattern',
    },
    messages: {
      msg: 'use "{{filename}}" as test file name',
    },
    schema: {},
  },
  defaultOptions: [],

  create: (context) => {
    const filename = context.getFilename();
    return {
      Program: (p) => {
        const m = pattern.exec(filename);
        if (m?.groups?.ext) {
          const ext = m.groups.ext;
          const f = path
            .basename(filename)
            .replace(new RegExp(`\\.spec\\.${ext}$`), `.test.${ext}`);
          context.report({
            node: p,
            messageId: 'msg',
            data: {
              filename: f,
            },
          });
        }
      },
    };
  },
});
