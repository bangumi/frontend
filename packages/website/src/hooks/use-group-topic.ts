import { ok } from 'oazapfts';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { TopicDetail } from '@bangumi/client/topic';

export interface UseGroupTopicRet {
  data: TopicDetail;
  mutate: () => Promise<unknown>;
}

function useGroupTopic(id: number): UseGroupTopicRet {
  const { data, mutate } = useSWR(
    `/group/topic/${id}`,
    async () => ok(ozaClient.getGroupTopicDetail(id)),
    {
      suspense: true,
    },
  );
  return { data, mutate };
}

export default useGroupTopic;
