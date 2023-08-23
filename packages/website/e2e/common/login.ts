import path from 'node:path';

import { test } from '@playwright/test';

export const userAuthFiles = {
  treeholechan: path.resolve(__dirname, '../.auth/treeholechan.json'),
} as const;

const testAsUser = (user: keyof typeof userAuthFiles) => {
  test.use({ storageState: userAuthFiles[user] });
};

export { testAsUser };
