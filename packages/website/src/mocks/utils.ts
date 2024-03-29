import fsp from 'node:fs/promises';
import path from 'node:path';

import type { DefaultBodyType, RequestHandler } from 'msw';
import { rest } from 'msw';

async function isFileExist(filePath: string): Promise<boolean> {
  try {
    await fsp.stat(filePath);
  } catch {
    return false;
  }

  return true;
}

async function loadFixture(pathname: string, requestMethod: string): Promise<DefaultBodyType> {
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

  return JSON.parse((await fsp.readFile(fixturePath)).toString()) as DefaultBodyType;
}

type HTTPMethods = 'get' | 'post' | 'put' | 'delete' | 'options';

export function mockAPI(url: string, method: HTTPMethods): RequestHandler {
  return rest[method](url, async (req, res, ctx) => {
    const data = await loadFixture(req.url.pathname, req.method);
    return res(ctx.status(200), ctx.json(data));
  });
}
