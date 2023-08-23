import { expect, test } from '@playwright/test';

import { testAsUser } from '../common/login';

test.describe('未登录用户', () => {
  test('未登录用户', async ({ page }) => {
    test.slow();
    await page.goto('/group/sandbox/members');
    await expect(page.getByRole('heading', { name: '小组管理员' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '小组成员' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '最近加入' })).toBeVisible();
  });
});

test.describe('已登录用户', () => {
  testAsUser('treeholechan');
  test('登录用户', async ({ page }) => {
    test.slow();
    await page.goto('/group/sandbox');
    await page.pause();

    await expect(
      page.getByRole('link', {
        name: '发表新主题',
      }),
    ).toBeVisible();
    await expect(page.getByText('退出该小组')).toBeVisible();

    await page.getByPlaceholder('给新帖取一个标题').click();
    await page.getByPlaceholder('给新帖取一个标题').fill('测试贴123');
    await page.getByPlaceholder('想聊点什么的呢…').click();
    await page.getByTestId('bold').locator('path').click();
    await page.getByPlaceholder('想聊点什么的呢…').fill(`[b]粗体[/b]
    [i]斜体[/i]
    [u]下划线[/u]
    [url=http://example.com]链接[/url]`);

    await page.getByRole('button', { name: '快速发帖' }).click();
    await page.waitForURL('/group/topic/*');

    await expect(
      page
        .getByRole('button', {
          name: '回复',
        })
        .first(),
    ).toBeVisible();
    await page.hover('.bgm-comment-actions__more');
    await expect(
      page
        .getByRole('button', {
          name: '删除',
        })
        .first(),
    ).toBeVisible();

    await page.getByPlaceholder('添加新回复...').click();
    await page.getByPlaceholder('添加新回复...').fill(`
    text1;[b]粗体[/b],[i]斜体[/i],
    [u]下划线[/u]
    [url=http://example.com]example[/url]`);
    await page.getByRole('button', { name: '写好了' }).click();
    await page.waitForTimeout(10 * 1000);

    await expect(
      page
        .getByRole('link', {
          name: 'example',
        })
        .last(),
    ).toBeVisible();
  });
});
