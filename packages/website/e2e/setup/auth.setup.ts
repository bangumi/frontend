import { expect, test as setup } from '@playwright/test';

import { userAuthFiles } from '@bangumi/website/e2e/common/login.ts';

setup('authenticate as treeholechan', async ({ page }) => {
  // 直接用 API 登录（测试 turnstile token），避免依赖 Cloudflare turnstile iframe
  const resp = await page.context().request.post('/p1/login', {
    data: {
      email: 'treeholechan@gmail.com',
      password: 'lovemeplease',
      // Cloudflare 测试用 turnstile token（server 用测试 secret key 时恒通过）
      turnstileToken: '10000000-aaaa-bbbb-cccc-000000000001',
    },
  });
  expect(resp.status()).toBe(200);

  await page.context().storageState({ path: userAuthFiles.treeholechan });
});
