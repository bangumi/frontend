import { expect, test } from '@playwright/test';

import { testAsUser } from '../common/login';

test.describe('main page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Bangumi 番组计划');
  });

  test('移动端首页不应横向溢出', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const headerContent = page.locator('header > div').first();
    await expect(headerContent).toHaveCSS('padding-left', '5px');
    await expect(headerContent).toHaveCSS('padding-right', '5px');
    await expect
      .poll(async () => page.evaluate(() => document.documentElement.scrollWidth))
      .toBe(375);
  });

  test('移动端可以展开导航菜单', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const toggle = page.getByRole('button', { name: '菜单' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.click();

    const navigation = page.locator('#mobile-navigation');
    await expect(toggle).toHaveAccessibleName('关闭菜单');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(navigation).toBeVisible();
    await expect(
      page.locator('#mobile-search-panel').getByRole('textbox', { name: '搜索' }),
    ).toBeVisible();
    await expect(navigation.getByRole('link', { name: '动画' })).toBeVisible();
  });

  test('移动端初始状态搜索面板不可见', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    // 回归测试：header 迁移 Panda CSS 后，smDown 内无条件 display:block 曾覆盖 hidden 属性，
    // 导致搜索面板在移动端无条件显示（#995）
    await expect(page.locator('#mobile-search-panel')).toBeHidden();
  });

  test('移动端已登录操作区保持水平对齐', async ({ page }) => {
    await page.route('**/p1/me', async (route) => {
      await route.fulfill({
        json: {
          id: 1,
          username: 'test-user',
          nickname: '测试用户',
          avatar: {
            small: '/favicon.ico',
            medium: '/favicon.ico',
            large: '/favicon.ico',
          },
        },
      });
    });
    await page.setViewportSize({ width: 436, height: 812 });
    await page.goto('/');

    const actions = page.locator('header > div > div:last-child');
    await expect(actions).toHaveCSS('display', 'flex');
    await expect(actions).toHaveCSS('align-items', 'center');
    await expect(page.getByRole('button', { name: '搜索' })).toBeVisible();
    await expect(page.locator('a[href="/notifications"]')).toBeVisible();
    await expect(page.locator('header a[href="/user/test-user"]')).toBeVisible();
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
