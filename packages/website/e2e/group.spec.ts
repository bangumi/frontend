import { expect, test } from '@playwright/test';

test.describe('group', () => {
  test('未登录用户', async ({ page }) => {
    await page.goto('/group/sandbox');
    await page.getByRole('link', { name: '小组讨论' }).click();
    await page.getByRole('link', { name: '--------主题编辑测试--------' }).click();
    await page.waitForURL('/group/topic/*');

    await expect(
      page.getByRole('link', {
        name: 'link',
      }),
    ).toHaveClass('bgm-link');
    await expect(page.getByRole('strong')).toBeVisible();
    await expect(page.getByRole('emphasis')).toBeVisible();
    await expect(page.getByText('underline')).toBeVisible();
    await expect(page.getByText('strike')).toBeVisible();
    await expect(page.getByText('mask')).toHaveClass('bgm-mask');

    await page.getByRole('link', { name: '小组成员' }).click();
    await page.waitForURL('**/group/sandbox/members');
    await expect(page.getByRole('heading', { name: '小组管理员' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '小组成员' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '最近加入' })).toBeVisible();
  });

  test('登录用户', async ({ page }) => {
    await page.goto('/group/sandbox');
    await page.getByRole('link', { name: '登录' }).click();
    await page.getByPlaceholder('你的 Email 地址').click();
    await page.getByPlaceholder('你的 Email 地址').fill('treeholechan@gmail.com');
    await page.getByPlaceholder('你的登录密码').click();
    await page.getByPlaceholder('你的登录密码').fill('lovemeplease');
    await page.waitForTimeout(5 * 1000);
    await page.getByRole('button', { name: '登录' }).click();
    await page.waitForURL('**/group/sandbox');

    await expect(
      page.getByRole('link', {
        name: '发表新主题',
      }),
    ).toBeVisible();
    await expect(page.getByText('退出该小组')).toBeVisible();

    await page.getByRole('link', { name: '--------主题编辑测试--------' }).click();
    await page.waitForURL('/group/topic/*');

    await expect(
      page
        .getByRole('button', {
          name: '回复',
        })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .getByRole('button', {
          name: '+1',
        })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .getByRole('button', {
          name: '删除',
        })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .getByRole('button', {
          name: '编辑',
        })
        .first(),
    ).toBeVisible();

    await page.getByPlaceholder('添加新回复...').click();
    await page.getByPlaceholder('添加新回复...').fill('text1;');
    await page.getByTestId('bold').locator('path').click();
    await page.getByPlaceholder('添加新回复...').fill('text1;[b]粗体[/b]');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').fill('text1;[b]粗体[/b],');
    await page.getByTestId('italic').locator('path').click();
    await page.getByPlaceholder('添加新回复...').fill('text1;[b]粗体[/b],[i]斜体[/i]');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').fill('text1;[b]粗体[/b],[i]斜体[/i],');
    await page.getByTestId('underscore').click();
    await page
      .getByPlaceholder('添加新回复...')
      .fill('text1;[b]粗体[/b],[i]斜体[/i],[u]下划线[/u]');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page
      .getByPlaceholder('添加新回复...')
      .fill('text1;[b]粗体[/b],[i]斜体[/i],[u]下划线[/u][url=http://example.com]example[/url]');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByPlaceholder('添加新回复...').press('ArrowRight');
    await page.getByRole('button', { name: '写好了' }).click();
    await page.waitForTimeout(10 * 1000);

    await expect(
      page.getByRole('link', {
        name: 'example',
      }),
    ).toBeVisible();
  });
});
