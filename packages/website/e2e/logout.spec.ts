import { expect, test } from '@playwright/test';

import { login } from './common/login';

test('current user should log out on logout page', async ({ page }) => {
  await page.goto('/login');
  await login(page);
  await page.waitForURL('/');
  await page.goto('/logout');
  await page.waitForURL('/');

  await expect(page.getByText('登录')).toBeVisible();
});
