import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { SubjectReview } from '@bangumi/client/client';

/** 获取条目的评论（/subject/:id/reviews） */
export function useSubjectReviews(
  subjectID: number,
  limit: number,
  offset: number,
): { data: SubjectReview[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `subject-reviews ${subjectID} ${limit} ${offset}`,
    async () => ok(ozaClient.getSubjectReviews(subjectID, { limit, offset })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
