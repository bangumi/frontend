export * from './common';

// https://github.com/drwpow/openapi-typescript/issues/941
export enum UserGroup {
  Admin = 1,
  BangumiAdmin = 2,
  DoujinAdmin = 3,
  MutedUser = 4,
  AccessForbiddenUser = 5,
  CharacterAdmin = 8,
  WikiAdmin = 9,
  User = 10,
  WikiContributor = 11,
}

export type { Notice as INotice } from './client';
