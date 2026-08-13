import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { Index, IndexType } from '@bangumi/client/client';

export type IndexOrder = 'hot' | 'latest';

/** 获取目录列表（全站公开目录，支持排序/类型过滤/分页） */
export function useIndexes(
  order: IndexOrder,
  type: IndexType | undefined,
  limit: number,
  offset: number,
): { indexes: Index[] | undefined; total: number | undefined } {
  const { data } = useSWR(
    `indexes ${order} ${type ?? 'all'} ${limit} ${offset}`,
    async () => ok(ozaClient.getIndexes({ order, $type: type, limit, offset })),
    { suspense: true },
  );

  return { indexes: data?.data, total: data?.total };
}
