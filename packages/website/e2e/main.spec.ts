import { expect, test } from '@playwright/test';

test.describe('main page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Bangumi 番组计划');
  });

  test('login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: '登录' }).click();
    await page.getByPlaceholder('你的 Email 地址').click();
    await page.getByPlaceholder('你的 Email 地址').fill('treeholechan@gmail.com');
    await page.getByPlaceholder('你的登录密码').click();
    await page.getByPlaceholder('你的登录密码').fill('lovemeplease');
    await page.waitForTimeout(5 * 1000);
    await page.getByRole('button', { name: '登录' }).click();
    await page.waitForURL('http://127.0.0.1:5173/');
    await expect(
      page
        .locator('div')
        .filter({ hasText: '全部条目动画书籍游戏三次元人物' })
        .first()
        .getByRole('img'),
    ).toBeVisible();
  });
});
