import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { SlimIndex } from '@bangumi/client/client';

/** 获取用户创建的目录 */
export function useUserIndexes(
  username: string,
  limit: number,
): { data: SlimIndex[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `user-indexes ${username} ${limit}`,
    async () => ok(ozaClient.getUserIndexes(username, { limit })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
