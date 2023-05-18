import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import yaml from 'js-yaml';
import openapiTS from 'openapi-typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 *
 * @return {Promise<import('openapi-typescript').OpenAPI3>}
 */
async function fetchSchema() {
  return yaml.load(await fs.readFile(path.resolve(__dirname, '..', 'api.yaml'), 'utf8'), {});
}

async function generateType(schema) {
  const data = await openapiTS(schema, { additionalProperties: false });

  await fs.mkdir(path.resolve(__dirname, '../types'), { recursive: true });

  await fs.writeFile(path.resolve(__dirname, '../types/index.ts'), data);
}

await generateType(await fetchSchema());
