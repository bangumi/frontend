import { ozaClient } from '@bangumi/client/index.ts';
import type { TopicApi } from '@bangumi/design/components/Topic/topic-api.ts';

/** 条目讨论话题操作实现 */
export const subjectTopicApi: TopicApi = {
  createReply: async (topicId, body) => ozaClient.createSubjectReply(topicId, body),
  deletePost: async (postId) => ozaClient.deleteSubjectPost(postId),
  likePost: async (postId, value) => ozaClient.likeSubjectPost(postId, { value }),
  unlikePost: async (postId) => ozaClient.unlikeSubjectPost(postId),
  replyEditPath: (postId) => `/subject/reply/${postId}/edit`,
};
