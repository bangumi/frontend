import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { Subject } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

export function useSubject(subjectID: number): Subject | undefined {
  const { data } = useSWR(`subject ${subjectID}`, async () => ok(ozaClient.getSubject(subjectID)), {
    suspense: true,
  });

  return data;
}
