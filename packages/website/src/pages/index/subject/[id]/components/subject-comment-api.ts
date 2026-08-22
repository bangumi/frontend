import type { ErrorResponse } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';
import type { TopicApi } from '@bangumi/design/components/Topic/topic-api.ts';

type TopicApiResult<T> =
  | {
      status: 200;
      data: T;
    }
  | {
      status: 429 | 500;
      data: ErrorResponse;
    };

/** 条目吐槽操作实现（Reactions 复用点赞；吐槽表单自建，replyTo 无意义） */
export const subjectCommentApi: TopicApi = {
  createReply: async (subjectId, body) =>
    ozaClient.createSubjectComment(subjectId, {
      comment: body.content,
      turnstileToken: body.turnstileToken,
    }),
  deletePost: async (postId) => ozaClient.deleteSubjectComment(postId),
  likePost: async (postId, value) => ozaClient.likeSubjectComment(postId, { value }),
  unlikePost: async (postId) => ozaClient.unlikeSubjectComment(postId),
  replyEditPath: () => '',
};
