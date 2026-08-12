import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { GroupFilterMode, GroupSort, SlimGroup } from '@bangumi/client/client';

/** 获取小组列表（/group/all 等） */
export function useGroups(
  sort: GroupSort,
  mode: GroupFilterMode | undefined,
  limit: number,
  offset: number,
): { data: SlimGroup[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `groups ${sort} ${mode ?? ''} ${limit} ${offset}`,
    async () => ok(ozaClient.getGroups(sort, { mode, limit, offset })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
