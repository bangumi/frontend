import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { CollectionType, SubjectInterestComment } from '@bangumi/client/client';

/** 获取条目的吐槽（/subject/:id/comments） */
export function useSubjectComments(
  subjectID: number,
  limit: number,
  offset: number,
  type?: CollectionType,
): { data: SubjectInterestComment[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `subject-comments ${subjectID} ${type ?? 'all'} ${limit} ${offset}`,
    async () => ok(ozaClient.getSubjectComments(subjectID, { $type: type, limit, offset })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
