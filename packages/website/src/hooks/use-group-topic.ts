import { ok } from 'oazapfts';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { TopicDetail } from '@bangumi/client/topic';

function useGroupTopic(id: number): { data: TopicDetail; mutate: () => Promise<unknown> } {
  const { data, mutate } = useSWR(
    `/group/topic/${id}`,
    async () => ok(ozaClient.getGroupTopicDetail(id)),
    {
      suspense: true,
    },
  );
  return { data: data!, mutate };
}

export default useGroupTopic;
