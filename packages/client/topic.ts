export * from './common.ts';

export type { Topic, Reply, ReplyBase, GroupTopic, Reaction } from './client.ts';

// https://github.com/drwpow/openapi-typescript/issues/941
// https://github.com/oazapfts/oazapfts/pull/349
export enum State {
  Normal = 0,
  Closed = 1,
  Reopen = 2,
  Silent = 5,
  DeletedByUser = 6,
  DeletedByAdmin = 7,
}
