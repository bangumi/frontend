// Code generated by @bangumi/client/scripts/build.mjs, DO NOT EDIT IT.

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ApiError } from '../error';
import type { operations } from '../types';
import type { ApiResponse } from '../types/utils';
import { response } from '../utils';

type M = 'getCurrentUser';

type Res =
  | ApiResponse<200, operations[M]['responses'][200]['content']['application/json']>
  | ApiResponse<401>;

type ResX = ApiResponse<200, operations[M]['responses'][200]['content']['application/json']>;

export async function execute(): Promise<Res> {
  const res = await fetch(`/p/me`, {
    method: 'get',
    credentials: 'same-origin',
  });

  return (await response(res)) as Res;
}

/**
 * method throw error when 'res.ok' is false
 */
export async function executeX(): Promise<ResX['data']> {
  const res = await execute();
  if (res.ok) {
    return res.data;
  }

  throw new ApiError(res);
}

export function swrKey(): string {
  return 'getCurrentUser';
}
