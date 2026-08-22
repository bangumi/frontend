import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { RaKuenTopic, RaKuenTopicType } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

interface UseRakuenTopicsRet {
  data: RaKuenTopic[] | undefined;
  total: number | undefined;
}

/**
 * 获取超展开聚合列表。
 * type 由 URL query 传入，登录态由服务端统一处理（如 my_group 未登录返回空列表）。
 */
export function useRakuenTopics(
  type: RaKuenTopicType,
  { limit = 50 }: { limit?: number } = {},
): UseRakuenTopicsRet {
  const { data } = useSWR(
    `rakuen-topics ${type} ${limit}`,
    async () => ok(ozaClient.getRaKuenTopics({ $type: type, limit })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
