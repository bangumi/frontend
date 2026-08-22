import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { PersonWork } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

/** 获取人物的作品列表（/person/:id/works） */
export function usePersonWorks(
  personID: number,
  limit: number,
  offset: number,
): { data: PersonWork[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `person-works ${personID} ${limit} ${offset}`,
    async () => ok(ozaClient.getPersonWorks(personID, { limit, offset })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
