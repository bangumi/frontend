import { expect, test } from '@playwright/test';

import { useFixtures } from '../common/fixtures';

test.describe('main page', () => {
  test('has title', async ({ page }) => {
    useFixtures(page);
    await page.goto('/');
    await expect(page).toHaveTitle('Bangumi 番组计划');
  });

  test('移动端首页不应横向溢出', async ({ page }) => {
    useFixtures(page);
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
    useFixtures(page);
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
    useFixtures(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    // 回归测试：header 迁移 Panda CSS 后，smDown 内无条件 display:block 曾覆盖 hidden 属性，
    // 导致搜索面板在移动端无条件显示（#995）
    await expect(page.locator('#mobile-search-panel')).toBeHidden();
  });

  test('移动端已登录操作区保持水平对齐', async ({ page }) => {
    useFixtures(page);
    await page.setViewportSize({ width: 436, height: 812 });
    await page.goto('/');

    const actions = page.locator('header > div > div:last-child');
    await expect(actions).toHaveCSS('display', 'flex');
    await expect(actions).toHaveCSS('align-items', 'center');
    await expect(page.getByRole('button', { name: '搜索' })).toBeVisible();
    // 通知铃铛与用户面板「提醒」都指向 /notifications，用可访问名区分
    await expect(page.getByRole('link', { name: '通知' })).toBeVisible();
    // 头像与用户面板「我的时光机」都指向用户主页，用头像 img 区分
    await expect(page.locator('header a[href="/user/382951"] img')).toBeVisible();
  });

  test('登录用户可以看到收藏菜单', async ({ page }) => {
    useFixtures(page);
    await page.goto('/');

    // 展开动画频道下拉，登录用户可见「我看」收藏组
    await page.getByRole('link', { name: '动画' }).first().hover();
    await expect(page.getByText('我看')).toBeVisible();
    await expect(page.getByRole('link', { name: '在看' })).toBeVisible();
  });
});
