import type { components } from './types';

export interface User {
  id: number;
  username: string;
  nickname: string;
  user_group: number;
  avatar: {
    small: string;
    medium: string;
    large: string;
  };
}

export type Avatar = components['schemas']['Avatar'];
export type Topic = components['schemas']['Topic'];
export type Pagination = Omit<components['schemas']['Paged'], 'data'>;

export interface ResponseWithPagination<T = unknown> extends Pagination {
  data: T;
}
