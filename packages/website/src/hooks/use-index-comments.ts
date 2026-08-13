import { ok } from '@oazapfts/runtime';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { CommentBase } from '@bangumi/client/client';

export type IndexComment = CommentBase & { replies: CommentBase[] };

export interface UseIndexCommentsRet {
  comments: IndexComment[];
  mutate: KeyedMutator<IndexComment[]>;
}

/** 获取目录的评论（楼层 + 楼中楼） */
function useIndexComments(indexId: number): UseIndexCommentsRet {
  const { data, mutate } = useSWR(
    `/index/${indexId}/comments`,
    async () => ok(ozaClient.getIndexComments(indexId)),
    { suspense: true },
  );
  return { comments: data ?? [], mutate };
}

export default useIndexComments;
