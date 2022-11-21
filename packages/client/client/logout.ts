// Code generated by @bangumi/client/scripts/build.mjs, DO NOT EDIT IT.

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ApiError } from '../error';
import type { ApiResponse } from '../types/utils';
import { response } from '../utils';

type M = 'logout';

type Res = ApiResponse<204, undefined> | ApiResponse<401>;

type ResX = ApiResponse<204, undefined>;

export async function execute(): Promise<Res> {
  const res = await fetch(`/p/logout`, {
    method: 'post',
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
