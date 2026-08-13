import { ok } from '@oazapfts/runtime';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { IndexRelated, IndexRelatedCategory, SubjectType } from '@bangumi/client/client';

export interface UseIndexRelatedRet {
  related: IndexRelated[];
  total: number;
  mutate: KeyedMutator<{ data: IndexRelated[]; total: number }>;
}

/** 获取目录的关联内容（可按关联分类/条目类型过滤） */
export function useIndexRelated(
  indexId: number,
  cat: IndexRelatedCategory | undefined,
  subjectType: SubjectType | undefined,
  limit: number,
  offset: number,
): UseIndexRelatedRet {
  const { data, mutate } = useSWR(
    `index-related ${indexId} ${cat ?? 'all'} ${subjectType ?? 'all'} ${limit} ${offset}`,
    async () => ok(ozaClient.getIndexRelated(indexId, { cat, $type: subjectType, limit, offset })),
    { suspense: true },
  );
  return { related: data?.data ?? [], total: data?.total ?? 0, mutate };
}
