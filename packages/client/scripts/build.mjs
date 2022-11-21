import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import RefParser from '@apidevtools/json-schema-ref-parser';
import { camelCase } from 'change-case';
import yaml from 'js-yaml';
import openapiTS from 'openapi-typescript';
import transformSchemaObject from 'openapi-typescript/dist/transform/schema-object.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const generatedHeaderComment = `// Code generated by @bangumi/client/scripts/build.mjs, DO NOT EDIT IT.\n`;

function removeSuffix(s, suffix) {
  if (s.endsWith(suffix)) {
    return s.slice(0, -suffix.length);
  }

  return s;
}

/**
 *
 * @return {Promise<import('openapi-typescript').OpenAPI3>}
 */
async function fetchSchema() {
  return yaml.load(await fs.readFile(path.resolve(__dirname, '..', 'api.yaml'), 'utf8'), {});
}

async function generateType(schema) {
  const data = await openapiTS(schema, { additionalProperties: false });

  await fs.mkdir(path.resolve(__dirname, '../client'), { recursive: true });
  await fs.mkdir(path.resolve(__dirname, '../types'), { recursive: true });

  await fs.writeFile(path.resolve(__dirname, '../types/index.ts'), data);
}

/**
 *
 * @param {import('openapi-typescript').OpenAPI3} openapi
 */
async function generateClient(openapi) {
  const schema = await RefParser.dereference(JSON.parse(JSON.stringify(openapi)));

  const typeMap = {
    integer: 'number',
    string: 'string',
  };

  function requiredType(t) {
    if (t.schema?.type?.default !== undefined) {
      return false;
    }
    return t.required;
  }

  function renderType(t) {
    return typeMap[t];
  }

  function renderEntryPoint(path, method, operator) {
    const { responses, parameters, operationId } = operator;
    const beforeFunction = [`type M = '${operationId}'`];

    const ParamType = [];
    const QueryType = [];

    const pathParameters = [];
    const returnString = [];

    const fetchOptions = [];
    if (method !== 'get') {
      fetchOptions.push(`method: '${method}',`);
    }
    const swrKey = [];

    if (parameters) {
      for (const parameter of parameters) {
        if (parameter.in === 'path') {
          ParamType.push([parameter.name, renderType(parameter.schema.type)]);
        }

        if (parameter.in === 'query') {
          if (requiredType(parameter.required)) {
            QueryType.push([parameter.name, renderType(parameter.schema.type)]);
          } else {
            QueryType.push([parameter.name + '?', renderType(parameter.schema.type)]);
          }
        }
      }
    }

    let queryName = 'query';
    if (QueryType.length) {
      if (QueryType.filter((x) => x[0].endsWith('?')).length) {
        queryName = queryName + '?';
      }
      pathParameters.push([queryName, 'Query']);
    }

    let requestPath = '`' + path.replace('{', '${') + '`';
    const beforeFetch = [];
    if (QueryType.length) {
      requestPath = `buildURL(${requestPath}, query)`;
      // handleQuery.push(`let _requestPath = ${requestPath}`);
      // requestPath = '_requestPath';
      // if (queryName.endsWith('?')) {
      //   handleQuery.push(`if(query !== undefined){`);
      //
      //   handleQuery.push('// @ts-expect-error');
      //   handleQuery.push(`_requestPath += '?' + new URLSearchParams(query).toString()`);
      //   handleQuery.push(`}`);
      // } else {
      //   handleQuery.push('// @ts-expect-error');
      //   handleQuery.push(`_requestPath += '?' + new URLSearchParams(query).toString()`);
      // }
      // handleQuery.push('');
    }

    if (method !== 'get') {
      const requestJSON = operator.requestBody?.content?.['application/json'];
      if (requestJSON) {
        let keys = {};
        if (requestJSON?.schema?.properties) {
          keys = Object.fromEntries(
            Object.keys(requestJSON?.schema?.properties).map((x) => [x, camelCase(x)]),
          );
        }

        let bodyTypeString = transformSchemaObject(requestJSON.schema, {
          ctx: {
            indentLv: 0,
            immutableTypes: true,
          },
        });

        for (const [requestKey, jsKey] of Object.entries(keys)) {
          if (requestKey !== jsKey) {
            bodyTypeString = bodyTypeString.replace(requestKey, jsKey);
          }
        }

        const runtimeBody =
          '{' +
          Object.entries(keys)
            .map(([key, value]) => {
              if (key === value) {
                return key + ',';
              }
              return `'${key}': ${value},`;
            })
            .join('\n') +
          '}';

        beforeFunction.push('interface RequestBody ' + bodyTypeString);

        pathParameters.push(['{' + Object.values(keys).join(',\n') + '}', 'RequestBody']);
        fetchOptions.push(`body: JSON.stringify(${runtimeBody}),`);
        fetchOptions.push(`headers: {`, `'content-type': 'application/json',`, `},`);
      }
    }

    if (ParamType.length) {
      pathParameters.unshift([
        '{' + ParamType.map((x) => removeSuffix(x[0], '?')).join(',') + '}',
        'Param',
      ]);
      beforeFunction.push('');
      beforeFunction.push('interface Param {');
      beforeFunction.push(...ParamType.map((x) => x.join(':') + ';'));
      beforeFunction.push('}');
    }

    if (QueryType.length) {
      beforeFunction.push('');
      beforeFunction.push('interface Query {');
      beforeFunction.push(...QueryType.map((x) => x.join(':') + ';'));
      beforeFunction.push('}');
    }

    beforeFunction.push('');
    beforeFunction.push('interface SWRKey {');
    beforeFunction.push('op: M;');
    if (ParamType.length) {
      beforeFunction.push('param: Param;');
    }

    if (QueryType.length) {
      beforeFunction.push('query: Query;');
    }
    beforeFunction.push('}');

    /**
     * render a response union string
     */
    const responseCode = Object.keys(responses).map((x) => parseInt(x));
    const ResponseTypeString = [];
    const OkResponseTypeString = [];

    let methResponseType = 'void';
    let methXResponseType = 'void';
    responseCode.forEach((code) => {
      const responseSchema =
        openapi.paths[path][method].responses[code]?.content?.['application/json'];

      let unionUnitType = `ApiResponse<${code}>`;
      if (responseSchema) {
        unionUnitType = `ApiResponse<${code}, operations[M]['responses'][${code}]['content']['application/json']>`;
      }

      if (code === 204) {
        unionUnitType = `ApiResponse<${code}, undefined>`;
      }

      ResponseTypeString.push(unionUnitType);
      if (code < 300) {
        OkResponseTypeString.push(unionUnitType);
      }
    });

    if (ResponseTypeString.length) {
      beforeFunction.push('');
      beforeFunction.push('type Res =' + ResponseTypeString.join('|\n'));
      methResponseType = 'Res';
    }

    if (OkResponseTypeString.length) {
      beforeFunction.push('');
      beforeFunction.push('type ResX =' + OkResponseTypeString.join('|\n'));
      methXResponseType = 'ResX["data"]';
    }

    returnString.push(`    return await response(res) as ${methResponseType}`);

    if (method === 'get') {
      if (pathParameters.length) {
        swrKey.push(
          'export function swrKey(',
          ParamType.length ? 'param:Param,' : '',
          QueryType.length ? 'query:Query,' : '',
          '): SWRKey {',
          '  return {',
          `    op: '${operationId}',`,
          ParamType.length ? 'param,' : '',
          QueryType.length ? 'query,' : '',
          '  }',
          '}',
        );
      } else {
        swrKey.push(`export function swrKey(): SWRKey {  return { op: '${operationId}' } }`);
      }

      const param = [];

      if (ParamType.length + QueryType.length) {
        param.push(
          '{',
          ParamType.length ? 'param,' : '',
          QueryType.length ? 'query,' : '',
          '}: SWRKey',
        );
      }

      swrKey.push(
        '',
        'export async function fetcher(',
        ...param,
        '):Promise<ResX["data"]>{',
        '  return executeX(',
        ParamType.length ? 'param,' : '',
        QueryType.length ? 'query,' : '',
        '  )',
        '}',
      );
    }

    return [
      generatedHeaderComment,
      `/* eslint-disable @typescript-eslint/naming-convention */`,
      '/* eslint-disable @typescript-eslint/consistent-type-assertions */',
      '/* eslint-disable @typescript-eslint/restrict-template-expressions */',
      `import { ApiError } from '../error';`,
      `import type { operations } from '../types';`,
      `import type { ApiResponse } from '../types/utils';`,
      `import { buildURL, response } from '../utils';`,
      '',
      ...beforeFunction,
      '',
      `export async function execute(${pathParameters
        .map((x) => x.join(':'))
        .join(',')}):Promise<${methResponseType}>{`,
      ...beforeFetch,
      `  const res= await fetch(${requestPath},`,
      fetchOptions.length ? '{' : '',
      ...fetchOptions,
      fetchOptions.length ? '}' : '',
      `  )`,
      ``,
      ...returnString,
      ``,
      `}`,
      ``,
      ``,
      `/**`,
      ` * method throw error when 'res.ok' is false`,
      ` */`,
      `export async function executeX(`,
      pathParameters.map((x) => x.join(':')).join(','),
      `):Promise<${methXResponseType}>{`,
      `  const res = await execute(${pathParameters
        .map((x) => (x[0].endsWith('?') ? x[0].slice(0, -1) : x[0]))
        .join(',')})`,
      `  if (res.ok) {`,
      `return res.data;`,
      `}`,
      ``,
      `throw new ApiError(res);`,
      `}`,
      ``,
      ...swrKey,
      ``,
    ].join('\n');
  }

  const ids = [];

  for (const [entryPoint, value] of Object.entries(schema.paths)) {
    for (const [method, operator] of Object.entries(value)) {
      console.log(entryPoint, method, operator.operationId);
      const p = path.resolve(__dirname, '..', 'client', operator.operationId + '.ts');
      ids.push(operator.operationId);
      await fs.writeFile(p, renderEntryPoint(entryPoint, method, operator));
    }
  }

  await fs.writeFile(
    path.resolve(__dirname, '..', 'client', 'index.ts'),
    generatedHeaderComment + ids.map((x) => `export * as ${x} from './${x}';\n`).join('\n'),
  );
}

await generateType(await fetchSchema());
await generateClient(await fetchSchema());
