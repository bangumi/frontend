import { ok } from 'oazapfts';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';

// type res = Awaited<ReturnType<typeof ok<ReturnType<typeof ozaClient.getGroupTopic>>>>

function useGroupTopic(id: number) {
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
