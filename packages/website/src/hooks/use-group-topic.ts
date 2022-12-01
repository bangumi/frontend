import useSWR from 'swr';

import { api } from '@bangumi/client';
import type { GroupTopics, Group } from '@bangumi/client/group';
type TopicsResp = {
  group: Group;
} & GroupTopics;

function useGroupTopic(id: number): TopicsResp {
  const { data: topicDetail } = useSWR(
    api.getGroupTopicById.swrKey({ topicID: id }),
    api.getGroupTopicById.fetcher,
    {
      suspense: true,
    },
  );
  return topicDetail! as TopicsResp;
}

export default useGroupTopic;
