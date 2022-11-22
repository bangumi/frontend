import type { ApiResponse } from './types/utils';

export class ApiError extends Error {
  constructor(readonly response: ApiResponse<number>) {
    super();
  }
}
