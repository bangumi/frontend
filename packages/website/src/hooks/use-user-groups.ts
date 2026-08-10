import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { SlimGroup } from '@bangumi/client/client';

/** 获取用户加入的小组 */
export function useUserGroups(
  username: string,
  limit: number,
): { data: SlimGroup[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `user-groups ${username} ${limit}`,
    async () => ok(ozaClient.getUserGroups(username, { limit })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
