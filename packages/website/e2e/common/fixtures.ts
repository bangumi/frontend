import fsp from 'node:fs/promises';
import path from 'node:path';

import type { Page, Route } from '@playwright/test';

const fixturesDirectory = path.join(__dirname, '../../src/mocks/fixtures');

/** 按 mocks/utils.ts 的命名约定加载 JSON fixture；无匹配文件时返回 undefined */
async function loadFixture(pathname: string, method: string): Promise<object | undefined> {
  const fixturePath = path.join(fixturesDirectory, `${pathname}-${method.toUpperCase()}.json`);
  try {
    await fsp.access(fixturePath);
  } catch {
    return undefined;
  }
  return JSON.parse(await fsp.readFile(fixturePath, 'utf8')) as object;
}

/**
 * 拦截 /p1/ API 请求并用本地 fixtures 响应，未匹配的请求直接失败，
 * 不透传到真实后端，保证 e2e 不依赖外部服务。
 */
export function useFixtures(page: Page): void {
  page.route('**/p1/**', async (route: Route) => {
    const { pathname } = new URL(route.request().url());
    const fixture = await loadFixture(pathname, route.request().method());
    if (fixture === undefined) {
      console.error(`e2e fixture missing for ${route.request().method()} ${pathname}`);
      return route.abort();
    }
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fixture),
    });
  });
}
