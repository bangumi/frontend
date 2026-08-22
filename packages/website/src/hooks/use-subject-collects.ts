import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { SubjectCollect } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

export function useSubjectCollects(
  subjectID: number,
  limit: number,
): { data: SubjectCollect[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `subject-collects ${subjectID} ${limit}`,
    async () => ok(ozaClient.getSubjectCollects(subjectID, { limit })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
