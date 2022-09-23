import path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import openapiTS from 'openapi-typescript'
import fetch from 'node-fetch'
import yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const openapiURL = process.env.OPENAPI_URL || 'https://raw.githubusercontent.com/bangumi/server/master/openapi/private.yaml'

async function fetchSchema (url) {
  const res = await fetch(url)
  const text = await res.text()
  return yaml.load(text)
}

async function dfs (obj, apiUrl, key) {
  const cur = key ? obj[key] : obj
  if (typeof cur !== 'object') {
    return
  }
  if (cur.$ref && cur.$ref.startsWith('.')) {
    const url = new URL(cur.$ref, apiUrl)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    obj[key] = await parseSchema(url.href)
    return
  }
  return Promise.all(Object.keys(cur).map(k => dfs(cur, apiUrl, k)))
}

async function parseSchema (url) {
  const schema = await fetchSchema(url)
  await dfs(schema, url)
  return schema
}

const mergedSchema = await parseSchema(openapiURL)

await fs.writeFile(path.resolve(__dirname, '../mergedSchema.json'), JSON.stringify(mergedSchema, null, 2))

const data = await openapiTS(mergedSchema)

await fs.writeFile(path.resolve(__dirname, '../types/index.ts'), data)
