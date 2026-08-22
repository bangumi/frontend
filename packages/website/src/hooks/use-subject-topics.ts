import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { Topic } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

/** 获取条目讨论版主题（/subject/:id/board） */
export function useSubjectTopics(
  subjectID: number,
  limit: number,
  offset: number,
): { data: Topic[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `subject-topics ${subjectID} ${limit} ${offset}`,
    async () => ok(ozaClient.getSubjectTopics(subjectID, { limit, offset })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
