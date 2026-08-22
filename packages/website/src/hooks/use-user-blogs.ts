import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { SlimBlogEntry } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

/** 获取用户发表的日志 */
export function useUserBlogs(
  username: string,
  limit: number,
): { data: SlimBlogEntry[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `user-blogs ${username} ${limit}`,
    async () => ok(ozaClient.getUserBlogs(username, { limit })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
