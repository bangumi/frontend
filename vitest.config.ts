import * as path from 'node:path';
import * as url from 'node:url';

import { defineConfig } from 'vitest/config';
import GithubActionsReporter from 'vitest-github-actions-reporter';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      // mock *.svg and *.svg?react file
      { find: /.*\.svg(\?react)?$/, replacement: path.resolve(dirname, 'tests/__mocks__/svg.js') },
      { find: '@bangumi/website', replacement: path.resolve(dirname, './packages/website/src') },
    ],
  },
  test: {
    exclude: ['**/node_modules', '**/dist', '**/e2e', '.git', '.cache', '.idea'],
    globals: true,
    reporters: process.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default',
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts', './tests/website.ts'],
    snapshotFormat: {
      printBasicPrototype: true,
    },
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text-summary'],
    },
  },
});
