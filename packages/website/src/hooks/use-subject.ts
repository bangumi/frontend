import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { Subject } from '@bangumi/client/client';

export function useSubject(subjectID: number): Subject | undefined {
  const { data } = useSWR(`subject ${subjectID}`, async () => ok(ozaClient.getSubject(subjectID)), {
    suspense: true,
  });

  return data;
}
