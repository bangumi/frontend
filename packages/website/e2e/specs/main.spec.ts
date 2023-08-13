import { expect, test } from '@playwright/test';

import { testAsUser } from '../common/login';

test.describe('main page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Bangumi 番组计划');
  });
});

test.describe('已登录用户', () => {
  testAsUser('treeholechan');
  test('应该能够看到收藏菜单', async ({ page }) => {
    await page.goto('/');
    await expect(
      page
        .locator('div')
        .filter({ hasText: '全部条目动画书籍游戏三次元人物' })
        .getByRole('img')
        .first(),
    ).toBeVisible();
  });
});
