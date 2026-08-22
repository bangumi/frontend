import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { SlimUser } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

/** 获取用户的好友列表 */
export function useUserFriends(
  username: string,
  limit: number,
): { data: SlimUser[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `user-friends ${username} ${limit}`,
    async () => ok(ozaClient.getUserFriends(username, { limit })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
