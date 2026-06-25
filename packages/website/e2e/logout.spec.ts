import { expect, test } from '@playwright/test';

import { testAsUser } from './common/login';

testAsUser('treeholechan');
test('current user should log out on logout page', async ({ page }) => {
  await page.goto('/logout');
  await page.waitForURL('/');

  await expect(page.getByText('登录')).toBeVisible();
});
