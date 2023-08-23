import { expect, test as setup } from '@playwright/test';

import { userAuthFiles } from '../common/login';

setup('authenticate as treeholechan', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('你的 Email 地址').fill('treeholechan@gmail.com');
  await page.getByPlaceholder('你的登录密码').click();
  await page.getByPlaceholder('你的登录密码').fill('lovemeplease');
  // NOTE: Cloudflare 网络不好可能载入需要花费一些时间
  await expect(page.frameLocator('iframe').locator('span', { hasText: 'Success!' })).toBeVisible({
    timeout: 30 * 1000,
  });
  await page.getByRole('button', { name: '登录' }).click();

  await page.waitForURL('/', { timeout: 30 * 1000 });

  await page.context().storageState({ path: userAuthFiles.treeholechan });
});
