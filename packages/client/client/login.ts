// Code generated by @bangumi/client/scripts/build.mjs, DO NOT EDIT IT.

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ApiError } from '../error';
import type { operations } from '../types';
import type { ApiResponse } from '../types/utils';
import { response } from '../utils';

type M = 'login';
interface RequestBody {
  readonly email: string;
  readonly password: string;
  readonly hCaptchaResponse: string;
}

interface SWRKey {
  op: M;
}

type Res =
  | ApiResponse<200, operations[M]['responses'][200]['content']['application/json']>
  | ApiResponse<400, operations[M]['responses'][400]['content']['application/json']>
  | ApiResponse<401, operations[M]['responses'][401]['content']['application/json']>
  | ApiResponse<415>
  | ApiResponse<422>
  | ApiResponse<429, operations[M]['responses'][429]['content']['application/json']>
  | ApiResponse<502>;

type ResX = ApiResponse<200, operations[M]['responses'][200]['content']['application/json']>;

export async function execute({ email, password, hCaptchaResponse }: RequestBody): Promise<Res> {
  const res = await fetch(`/p/login`, {
    method: 'post',
    body: JSON.stringify({ email, password, 'h-captcha-response': hCaptchaResponse }),
    headers: {
      'content-type': 'application/json',
    },
  });

  return (await response(res)) as Res;
}

/**
 * method throw error when 'res.ok' is false
 */
export async function executeX({
  email,
  password,
  hCaptchaResponse,
}: RequestBody): Promise<ResX['data']> {
  const res = await execute({ email, password, hCaptchaResponse });
  if (res.ok) {
    return res.data;
  }

  throw new ApiError(res);
}
