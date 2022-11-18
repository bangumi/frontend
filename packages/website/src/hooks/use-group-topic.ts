import useSWR from 'swr';

import type { GroupTopics, Group } from '@bangumi/types/group';

import { privateGet } from '../api/request';

type TopicsResp = {
  group: Group;
} & GroupTopics;

interface UseGroupTopic {
  topicDetail: TopicsResp;
}

function useGroupTopic(id: string): UseGroupTopic {
  // todo
  const { data: { data: topicDetail } = {} } = useSWR<unknown>(
    `/p/groups/-/topics/${id}`,
    privateGet,
  );
  return { topicDetail };
}

export default useGroupTopic;
