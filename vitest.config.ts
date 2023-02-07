import path from 'node:path';
import * as url from 'node:url';

import { defineConfig } from 'vitest/config';
import GithubActionsReporter from 'vitest-github-actions-reporter';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@bangumi/website': path.resolve(dirname, './src'),
    },
  },
  test: {
    reporters: process.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default',
    environment: 'jsdom',
    setupFiles: ['./jest-setup.ts', './packages/website/jest-setup.ts'],
    threads: false,
    snapshotFormat: {
      printBasicPrototype: true,
    },
    coverage: {
      provider: 'c8',
      reporter: ['lcov', 'text-summary'],
    },
  },
});
