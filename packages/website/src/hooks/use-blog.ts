import { ok } from '@oazapfts/runtime';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import type { BlogEntry, CommentBase, SlimSubject } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

/** 日志吐槽：主评论与其子回复 */
export type BlogComment = CommentBase & { replies: CommentBase[] };

export interface UseBlogEntryRet {
  data: BlogEntry;
  mutate: KeyedMutator<BlogEntry>;
}

export interface UseBlogCommentsRet {
  data: BlogComment[];
  mutate: KeyedMutator<BlogComment[]>;
}

function useBlogEntry(id: number): UseBlogEntryRet {
  const { data, mutate } = useSWR(`/blog/${id}`, async () => ok(ozaClient.getBlogEntry(id)), {
    suspense: true,
  });
  return { data, mutate };
}

function useBlogComments(id: number): UseBlogCommentsRet {
  const { data, mutate } = useSWR(
    `/blog/${id}/comments`,
    async () => ok(ozaClient.getBlogComments(id)),
    { suspense: true },
  );
  return { data, mutate };
}

/** 日志关联条目；请求失败时返回空列表，不影响日志主体展示 */
function useBlogRelatedSubjects(id: number): { data: SlimSubject[] } {
  const { data } = useSWR(`/blog/${id}/subjects`, async () =>
    ok(ozaClient.getBlogRelatedSubjects(id)),
  );
  return { data: data ?? [] };
}

export default useBlogEntry;
export { useBlogComments, useBlogRelatedSubjects };
