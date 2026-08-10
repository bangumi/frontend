import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { SlimSubject, SubjectType } from '@bangumi/client/client';

/** 获取用户某类型条目的收藏列表 */
export function useUserSubjectCollections(
  username: string,
  subjectType: SubjectType,
  limit: number,
): { data: SlimSubject[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `user-subject-collections ${username} ${subjectType} ${limit}`,
    async () => ok(ozaClient.getUserSubjectCollections(username, { subjectType, limit })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
