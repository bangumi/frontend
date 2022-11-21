// Code generated by @bangumi/client/scripts/build.mjs, DO NOT EDIT IT.

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ApiError } from '../error';
import type { operations } from '../types';
import type { ApiResponse } from '../types/utils';
import { response } from '../utils';

type M = 'getGroupTopicById';

interface Param {
  topic_id: number;
}

interface SWRKey {
  op: M;
  param: Param;
}

type Res =
  | ApiResponse<200, operations[M]['responses'][200]['content']['application/json']>
  | ApiResponse<400, operations[M]['responses'][400]['content']['application/json']>
  | ApiResponse<404, operations[M]['responses'][404]['content']['application/json']>;

type ResX = ApiResponse<200, operations[M]['responses'][200]['content']['application/json']>;

export async function execute({ topic_id }: Param): Promise<Res> {
  const res = await fetch(`/p/groups/-/topics/${topic_id}`);

  return (await response(res)) as Res;
}

/**
 * method throw error when 'res.ok' is false
 */
export async function executeX({ topic_id }: Param): Promise<ResX['data']> {
  const res = await execute({ topic_id });
  if (res.ok) {
    return res.data;
  }

  throw new ApiError(res);
}

export function swrKey(param: Param): SWRKey {
  return {
    op: 'getGroupTopicById',
    param,
  };
}

export async function fetcher({ param }: SWRKey): Promise<ResX['data']> {
  return executeX(param);
}
