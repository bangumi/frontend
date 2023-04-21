/* eslint-disable @typescript-eslint/no-misused-promises */

import * as fs from 'node:fs/promises';

import type { Plugin, UserConfig } from 'vite';

import { generateDeclaration } from '../../../dev/css-typed/gen.mts';

export default function plugin(): Plugin {
  return {
    name: 'typed-css-modules',
    config: () => {
      const config: UserConfig = {
        css: {
          modules: {
            localsConvention: 'camelCaseOnly',
          },
        },
      };
      return config;
    },
    configureServer: (server) => {
      server.watcher.on('change', async (path) => {
        if (!path.endsWith('.module.less')) return;
        let dts: string | undefined;
        try {
          const content = await fs.readFile(path);
          dts = await generateDeclaration(path, content.toString('utf-8'));
        } catch {
          /* ignore */
        }

        if (dts) {
          await fs.writeFile(path + '.d.ts', dts);
        }
      });
      server.watcher.on('unlink', async (path) => {
        if (!path.endsWith('.module.css')) return;

        try {
          await fs.unlink(path + '.d.ts');
        } catch {
          /* ignore */
        }
      });
    },
  };
}
