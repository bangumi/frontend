import { ok } from '@oazapfts/runtime';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import type { CollectionType, SubjectInterestComment } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

/** 获取条目的吐槽（/subject/:id/comments） */
export function useSubjectComments(
  subjectID: number,
  limit: number,
  offset: number,
  type?: CollectionType,
): {
  data: SubjectInterestComment[] | undefined;
  total: number | undefined;
  mutate: KeyedMutator<{ data: SubjectInterestComment[]; total: number }>;
} {
  const { data, mutate } = useSWR(
    `subject-comments ${subjectID} ${type ?? 'all'} ${limit} ${offset}`,
    async () => ok(ozaClient.getSubjectComments(subjectID, { $type: type, limit, offset })),
    { suspense: true },
  );

  return { data: data?.data, total: data?.total, mutate };
}
