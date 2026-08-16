import { ozaClient } from '@bangumi/client';
import type { CreateReply, ErrorResponse, TurnstileToken } from '@bangumi/client/client';

/** 话题相关操作的统一返回，客户端只关心 200 与错误信息 */
type TopicApiResult<T> =
  | {
      status: 200;
      data: T;
    }
  | {
      status: 429 | 500;
      data: ErrorResponse;
    };

/**
 * 话题页面所需的回复/删除/点赞操作，group 与 subject 话题分别提供实现。
 * blog、episode 等同样具备"评论列表 + 回复表单"的页面日后可复用该接口。
 */
export interface TopicApi {
  createReply: (
    topicId: number,
    body: CreateReply & TurnstileToken,
  ) => Promise<TopicApiResult<{ id: number }>>;
  deletePost: (postId: number) => Promise<TopicApiResult<{}>>;
  likePost: (postId: number, value: number) => Promise<TopicApiResult<{}>>;
  unlikePost: (postId: number) => Promise<TopicApiResult<{}>>;
  /**
   * 编辑回复内容，提供时编辑入口改为内联编辑表单；未提供时使用 replyEditPath 跳转编辑页
   */
  editPost?: (postId: number, content: string) => Promise<TopicApiResult<{}>>;
  /** 回复编辑页面路径 */
  replyEditPath: (postId: number) => string;
}

/** 小组话题默认实现 */
export const groupTopicApi: TopicApi = {
  createReply: async (topicId, body) => ozaClient.createGroupReply(topicId, body),
  deletePost: async (postId) => ozaClient.deleteGroupPost(postId),
  likePost: async (postId, value) => ozaClient.likeGroupPost(postId, { value }),
  unlikePost: async (postId) => ozaClient.unlikeGroupPost(postId),
  replyEditPath: (postId) => `/group/reply/${postId}/edit`,
};
