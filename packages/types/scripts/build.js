import path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import openapiTS from 'openapi-typescript'
import fetch from 'node-fetch'
import yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const openapiURL =
  process.env.OPENAPI_URL || 'https://bangumi.github.io/dev-docs/api.yaml'

async function fetchSchema(url) {
  const res = await fetch(url)
  const text = await res.text()
  return yaml.load(text)
}
const schema = await fetchSchema(openapiURL)

const data = await openapiTS(schema)

await fs.writeFile(path.resolve(__dirname, '../types/index.ts'), data)
