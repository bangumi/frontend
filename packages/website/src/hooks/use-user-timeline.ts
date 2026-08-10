import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { Timeline } from '@bangumi/client/client';

/** 获取用户最近的时间胶囊（时间线） */
export function useUserTimeline(
  username: string,
  limit = 10,
): { data: Timeline[] | undefined; mutate: () => Promise<unknown> } {
  const { data, mutate } = useSWR(
    `user-timeline ${username} ${limit}`,
    async () => ok(ozaClient.getUserTimeline(username, { limit })),
    { suspense: true },
  );

  return { data, mutate };
}
