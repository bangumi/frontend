import type { components } from './types';

export type { SlimUser, Profile, Topic } from './client';
export type Avatar = components['schemas']['Avatar'];

export interface PaginationQuery {
  /** Limit */
  limit: number;
  /** Offset */
  offset: number;
}

export interface Pagination {
  /** Total */
  total: number;
}

export interface ResponseWithPagination<T = unknown> extends Pagination {
  data: T;
}
