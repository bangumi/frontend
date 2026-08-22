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

const unsupported = async (): Promise<TopicApiResult<{}>> => ({
  status: 500,
  data: { code: '', error: '', message: '目录评论暂不支持此操作', statusCode: 500 },
});

/** 目录评论操作实现（供 ReplyForm 复用发帖表单，点赞暂不支持） */
export const indexCommentApi: TopicApi = {
  createReply: async (indexId, body) => ozaClient.createIndexComment(indexId, body),
  deletePost: async (postId) => ozaClient.deleteIndexComment(postId),
  likePost: unsupported,
  unlikePost: unsupported,
  replyEditPath: () => '',
};
