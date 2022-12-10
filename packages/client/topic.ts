import type { components } from './types';

export * from './common';

export interface Comment {
  /** @description 发帖人是否好友 */
  isFriend: boolean;
  /**
   * Format: date-time
   * @example 2008-07-14T15:38:35+08:00
   */
  createdAt: number;
  creator: components['schemas']['User'];
  /**
   * Format: int32
   * @example 2
   */
  id: number;
  replies: Reply[];
  /**
   * @description 如果 `state` 不为 `0`，内容为空
   * @example 你是猪 ... 鉴定完毕 ...
   */
  text: string;
  /**
   * CommentState
   * @description 回复和帖子共用的状态
   *
   * 表示帖子正常/下沉/关闭
   *
   * 如果是回复，表示管理员的下沉/关闭主题操作
   *
   *
   * - `0` 正常
   * - `2` 重开
   * - `1` 管理员关闭帖子
   * - `5` 管理员下沉帖子
   * - `6` 被用户删除
   * - `7` 违反社区指导原则，已被删除
   * @example 0
   * @enum {integer}
   */
  state: number;
}

export interface Reply {
  /**
   * Format: date-time
   * @example 2012-12-23T20:46:29+08:00
   */
  createdAt: number;
  creator: components['schemas']['User'];
  /**
   * Format: int32
   * @example 24360
   */
  id: number;
  /**
   * @description 如果 `state` 不为 `0`，内容为空
   * @example [quote][b]15www[/b] 说: 檞寄生+1 我的明菁 T-T[/quote]\n挖墳黨喪心病狂！
   */
  text?: string;
  state: components['schemas']['Comment']['state'];
  /** @description 发帖人是否好友 */
  isFriend: boolean;
}

// https://github.com/drwpow/openapi-typescript/issues/941
export enum State {
  Normal = 0,
  Closed = 1,
  Reopen = 2,
  Silent = 5,
  DeletedByUser = 6,
  DeletedByAdmin = 7,
}
