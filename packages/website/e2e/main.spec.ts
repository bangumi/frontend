import { expect, test } from '@playwright/test';

import { login } from './common/login';

test.describe('main page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Bangumi 番组计划');
  });

  test('login', async ({ page }) => {
    await page.goto('/');
    await login(page);
    await page.waitForURL('http://127.0.0.1:5173/');
    await expect(
      page
        .locator('div')
        .filter({ hasText: '全部条目动画书籍游戏三次元人物' })
        .getByRole('img')
        .first(),
    ).toBeVisible();
  });
});
