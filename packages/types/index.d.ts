import type { operations } from './types';

type Response<
  Op extends keyof operations,
  status extends 200 | 401 | 404 | 400,
> = operations[Op]['responses'][status]['content']['application/json'];
