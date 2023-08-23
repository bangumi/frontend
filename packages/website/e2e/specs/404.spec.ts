import { expect, test } from '@playwright/test';

test.describe('404', () => {
  test('返回首页', async ({ page }) => {
    await page.goto('/');
    await page.goto('/anypage');
    await expect(page.getByText('呜咕，出错了…')).toBeVisible();
    await page.getByRole('link', { name: '返回首页' }).click();
    await expect(page).toHaveURL('/');
  });

  test('返回上页', async ({ page }) => {
    await page.goto('/');
    await page.goto('/anypage');
    await expect(page.getByText('呜咕，出错了…')).toBeVisible();
    await page.getByText('返回上页').click();
    await expect(page).toHaveURL('/');
  });
});
