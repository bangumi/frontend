// Code generated by @bangumi/client/scripts/build.mjs, DO NOT EDIT IT.

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ApiError } from '../error';
import type { operations } from '../types';
import type { ApiResponse } from '../types/utils';
import { response } from '../utils';

type M = 'getSubjectTopicsById';

type Res =
  | ApiResponse<200, operations[M]['responses'][200]['content']['application/json']>
  | ApiResponse<400, operations[M]['responses'][400]['content']['application/json']>
  | ApiResponse<404, operations[M]['responses'][404]['content']['application/json']>;

type ResX = ApiResponse<200, operations[M]['responses'][200]['content']['application/json']>;

export async function execute(
  subject_id: number,
  query?: { limit?: number; offset?: number },
): Promise<Res> {
  let _requestPath = `/p/subjects/${subject_id}/topics`;
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
  subject_id: number,
  query?: { limit?: number; offset?: number },
): Promise<ResX['data']> {
  const res = await execute(subject_id, query);
  if (res.ok) {
    return res.data;
  }

  throw new ApiError(res);
}

export function swrKey(
  subject_id: number,
  { limit, offset }: { limit?: number; offset?: number } = {},
): string {
  return `getSubjectTopicsById-${subject_id}-${limit}-${offset}`;
}
