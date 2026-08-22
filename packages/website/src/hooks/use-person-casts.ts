import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { PersonCharacter } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

/** 获取人物的演出角色列表（/person/:id/works/voice） */
export function usePersonCasts(
  personID: number,
  limit: number,
  offset: number,
): { data: PersonCharacter[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `person-casts ${personID} ${limit} ${offset}`,
    async () => ok(ozaClient.getPersonCasts(personID, { limit, offset })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
