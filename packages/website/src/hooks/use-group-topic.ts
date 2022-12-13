import { ok } from 'oazapfts';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { TopicDetail } from '@bangumi/client/topic';

function useGroupTopic(id: number): TopicDetail {
  const { data: topicDetail } = useSWR(
    `/group/topic/${id}`,
    async () => ok(ozaClient.getGroupTopicDetail(id)),
    {
      suspense: true,
    },
  );
  return topicDetail!;
}

export default useGroupTopic;
