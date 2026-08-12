import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { GroupTopic } from '@bangumi/client/client';
import { GroupTopicFilterMode } from '@bangumi/client/client';

/**
 * 获取小组话题流。
 * 不传 mode 时固定传服务端默认模式 Joined，由服务端按登录态分发：
 * 登录返回已加入小组的话题，未登录强制返回全部话题。
 */
export function useRecentGroupTopics(
  limit: number,
  offset: number,
  mode?: GroupTopicFilterMode,
): { data: GroupTopic[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `recent-group-topics ${mode ?? ''} ${limit} ${offset}`,
    async () =>
      ok(ozaClient.getRecentGroupTopics(mode ?? GroupTopicFilterMode.Joined, { limit, offset })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
