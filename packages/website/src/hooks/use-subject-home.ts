import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { SubjectHomeResponse } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

export function useSubjectHome(subjectID: number): {
  data: SubjectHomeResponse | undefined;
  mutate: () => Promise<unknown>;
} {
  const { data, mutate } = useSWR(
    `subject-home ${subjectID}`,
    async () => ok(ozaClient.getSubjectHome(subjectID)),
    {
      suspense: true,
    },
  );

  return { data, mutate };
}
