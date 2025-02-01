import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { Topic } from '@bangumi/client/topic';

interface UseGroupTopicsRet {
  data: Topic[] | undefined;
  total: number | undefined;
}

export function useGroupTopics(
  name: string,
  { limit = 20, offset = 0, disable = false },
): UseGroupTopicsRet {
  const { data } = useSWR(
    disable ? null : `listGroupTopics ${name} ${limit} ${offset}`,
    async () => ok(ozaClient.getGroupTopics(name, { limit, offset })),
    {
      suspense: true,
    },
  );

  return data ?? { data: undefined, total: undefined };
}
