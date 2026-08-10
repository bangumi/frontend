import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { SubjectHomeResponse } from '@bangumi/client/client';

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
