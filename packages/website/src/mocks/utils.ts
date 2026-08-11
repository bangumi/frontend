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

type HTTPMethods = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options';

export function mockAPI(url: string, method: HTTPMethods): HttpHandler {
  return http[method](url, async ({ request }) => {
    const requestUrl = new URL(request.url);
    const data = await loadFixture(requestUrl.pathname, request.method);
    return HttpResponse.json(data, { status: 200 });
  });
}

export type ApiFunction = (...args: never[]) => Promise<unknown>;

export type SuccessfulData<T extends ApiFunction> = Extract<
  Awaited<ReturnType<T>>,
  { status: 200 }
>['data'];

/** 将 API 响应类型递归映射为纯 JSON 可赋值的类型，用于类型化 mock fixture */
export type JsonFixture<T> = T extends number
  ? number
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : T extends (infer Item)[]
        ? JsonFixture<Item>[]
        : T extends object
          ? { [Key in keyof T]: JsonFixture<T[Key]> }
          : T;
