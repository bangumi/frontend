import type { operations } from './types';

/**
 * usage:
 *  ResponseData<'getGroupTopicsById', 200>
 *  ResponseData<'login', 200 | 401>
 *
 * wrong status that openapi doesn't define will return never.
 * for example, `ResponseData<'login', 10>` is `never`
 */
export type ResponseData<
  Op extends keyof operations,
  status extends 200 | 400 | 401 | 403 | 404 | 502,
> = Exclude<status, keyof operations[Op]['responses']> extends never
  ? status extends keyof operations[Op]['responses']
    ? operations[Op]['responses'][status] extends { content: { 'application/json': infer T } }
      ? T
      : never
    : never
  : never;
