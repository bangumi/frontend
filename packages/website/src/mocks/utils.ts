import { rest, RequestHandler } from 'msw';
import fsp from 'fs/promises';
import path from 'path';

async function isFileExist(filePath: string): Promise<boolean> {
  try {
    await fsp.stat(filePath);
  } catch {
    return false;
  }

  return true;
}

async function loadFixture(
  pathname: string,
  requestMethod: string,
): Promise<Record<string, any> | any[]> {
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

  return JSON.parse((await fsp.readFile(fixturePath)).toString());
}

type HTTPMethods = 'get' | 'post' | 'put' | 'delete' | 'options';

export function mockAPI(url: string, method: HTTPMethods): RequestHandler {
  return rest[method](url, async (req, res, ctx) => {
    const data = await loadFixture(req.url.pathname, req.method);
    return await res(ctx.status(200), ctx.json(data));
  });
}
