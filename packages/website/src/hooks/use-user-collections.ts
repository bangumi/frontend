import { ok } from '@oazapfts/runtime';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import type { CollectionType, SlimSubject, SubjectType } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

interface UserSubjectCollectionsParams {
  /** 收藏状态过滤 */
  type?: CollectionType;
  limit: number;
  offset?: number;
}

/** 获取用户某类型条目的收藏列表 */
export function useUserSubjectCollections(
  username: string,
  subjectType: SubjectType,
  { type, limit, offset = 0 }: UserSubjectCollectionsParams,
): {
  data: SlimSubject[] | undefined;
  total: number | undefined;
  mutate: KeyedMutator<{ data: SlimSubject[]; total: number }>;
} {
  const { data, mutate } = useSWR(
    `user-subject-collections ${username} ${subjectType} ${type ?? ''} ${limit} ${offset}`,
    async () =>
      ok(
        ozaClient.getUserSubjectCollections(username, { subjectType, $type: type, limit, offset }),
      ),
    { suspense: true },
  );

  return { data: data?.data, total: data?.total, mutate };
}
