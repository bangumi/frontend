import { rest } from 'msw'
import fsp from 'fs/promises'
import path from 'path'

async function isFileExist (filePath: string): Promise<boolean> {
  try {
    await fsp.stat(filePath)
  } catch (e) {
    return false
  }

  return true
}

async function loadFixture (pathname: string, requestMethod: string): Promise<string> {
  const fixturePath = path.join(__dirname, './fixtures', `${pathname}-GET.json`)

  if (!(await isFileExist(fixturePath))) {
    const errMessage = `缺少对应 ${pathname} API Mock 文件。请创建 ${fixturePath} 添加 JSON mock`
    console.error(errMessage)
    throw new Error(errMessage)
  }

  return JSON.parse((await fsp.readFile(fixturePath)).toString())
}

type HTTPMethods = 'get' | 'post' | 'put' | 'delete' | 'options'

export function mockAPI (url: string, method: HTTPMethods) {
  return rest[method](url, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(await loadFixture(req.url.pathname, req.method))
    )
  })
}
