// Code generated by @bangumi/client/scripts/build.mjs, DO NOT EDIT IT.

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ApiError } from '../error';
import type { operations } from '../types';
import type { ApiResponse } from '../types/utils';
import { response } from '../utils';

type M = 'listGroupMembersByName';

type Res =
  | ApiResponse<200, operations[M]['responses'][200]['content']['application/json']>
  | ApiResponse<404>;

type ResX = ApiResponse<200, operations[M]['responses'][200]['content']['application/json']>;

export async function execute(
  name: string,
  query?: { type?: string; limit?: number; offset?: number },
): Promise<Res> {
  let _requestPath = `/p/groups/${name}/members`;
  if (query !== undefined) {
    // @ts-expect-error
    _requestPath += '?' + new URLSearchParams(query).toString();
  }

  const res = await fetch(_requestPath, {
    method: 'get',
    credentials: 'same-origin',
  });

  return (await response(res)) as Res;
}

/**
 * method throw error when 'res.ok' is false
 */
export async function executeX(
  name: string,
  query?: { type?: string; limit?: number; offset?: number },
): Promise<ResX['data']> {
  const res = await execute(name, query);
  if (res.ok) {
    return res.data;
  }

  throw new ApiError(res);
}

export function swrKey(
  name: string,
  { type, limit, offset }: { type?: string; limit?: number; offset?: number } = {},
): string {
  return `listGroupMembersByName-${name}-${type}-${limit}-${offset}`;
}
