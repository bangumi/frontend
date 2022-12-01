import type { components } from './types';

export * from './common';

export type Comment = components['schemas']['Comment'];
export type Reply = components['schemas']['Comment']['replies'][0];

// https://github.com/drwpow/openapi-typescript/issues/941
export enum State {
  Normal = 0,
  Closed = 1,
  Reopen = 2,
  Silent = 5,
  DeletedByUser = 6,
  DeletedByAdmin = 7,
}
