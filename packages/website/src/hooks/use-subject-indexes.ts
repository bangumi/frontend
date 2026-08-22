import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { SlimIndex } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

/** 获取推荐条目的目录（/subject/:id/index） */
export function useSubjectIndexes(
  subjectID: number,
  limit: number,
  offset: number,
): { data: SlimIndex[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `subject-indexes ${subjectID} ${limit} ${offset}`,
    async () => ok(ozaClient.getSubjectIndexes(subjectID, { limit, offset })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
