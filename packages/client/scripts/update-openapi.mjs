import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const openapiURL = process.env.OPENAPI_URL || 'https://bangumi.github.io/dev-docs/api.yaml';

async function fetchSchema(url) {
  const res = await fetch(url);
  const text = await res.text();
  await fs.writeFile(path.resolve(__dirname, '..', 'api.yaml'), text);
}

await fetchSchema(openapiURL);
