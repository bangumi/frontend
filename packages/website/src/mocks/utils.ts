import fsp from 'node:fs/promises';
import path from 'node:path';

import type { HttpHandler } from 'msw';
import { http, HttpResponse } from 'msw';

async function isFileExist(filePath: string): Promise<boolean> {
  try {
    await fsp.stat(filePath);
  } catch {
    return false;
  }

  return true;
}

async function loadFixture(pathname: string, requestMethod: string): Promise<object> {
  const fixturePath = path.join(
    __dirname,
    './fixtures',
    `${pathname}-${requestMethod.toUpperCase()}.json`,
  );

  if (!(await isFileExist(fixturePath))) {
    const errMessage = `缺少对应 ${pathname} API Mock 文件。请创建 ${fixturePath} 添加 JSON mock`;
    console.error(errMessage);
    throw new Error(errMessage);
  }

  return JSON.parse((await fsp.readFile(fixturePath)).toString()) as object;
}

type HTTPMethods = 'get' | 'post' | 'put' | 'delete' | 'options';

export function mockAPI(url: string, method: HTTPMethods): HttpHandler {
  return http[method](url, async ({ request }) => {
    const requestUrl = new URL(request.url);
    const data = await loadFixture(requestUrl.pathname, request.method);
    return HttpResponse.json(data, { status: 200 });
  });
}
