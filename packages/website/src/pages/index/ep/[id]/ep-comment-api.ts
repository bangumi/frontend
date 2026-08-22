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

/** 章节评论操作实现（供 ReplyForm/Reactions/Topic.Comment 复用发帖与点赞表单） */
export const epCommentApi: TopicApi = {
  createReply: async (episodeId, body) => ozaClient.createEpisodeComment(episodeId, body),
  deletePost: async (postId) => ozaClient.deleteEpisodeComment(postId),
  likePost: async (postId, value) => ozaClient.likeEpisodeComment(postId, { value }),
  unlikePost: async (postId) => ozaClient.unlikeEpisodeComment(postId),
  editPost: async (postId, content) => ozaClient.updateEpisodeComment(postId, { content }),
  replyEditPath: () => '',
};
