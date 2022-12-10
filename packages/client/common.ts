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

export interface Topic {
  id: number;
  creator: {
    id: number;
    username: string;
    avatar: {
      small: string;
      medium: string;
      large: string;
    };
    nickname: string;
    sign: string;
    user_group: number;
  };
  parentID: number;
  title: string;
  createdAt: number;
  updatedAt: number;
  repliesCount: number;
}

export type Pagination = Omit<components['schemas']['Paged'], 'data'>;

export interface ResponseWithPagination<T = unknown> extends Pagination {
  data: T;
}
