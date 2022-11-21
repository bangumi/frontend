import useSWR from 'swr';

import type { GroupTopics, Group } from '@bangumi/types/group';

import { privateGet } from '../api/request';

type TopicsResp = {
  group: Group;
} & GroupTopics;

function useGroupTopic(id: string): TopicsResp {
  const { data: topicDetail } = useSWR<TopicsResp>(`/p/groups/-/topics/${id}`, privateGet, {
    suspense: true,
  });
  return topicDetail!;
}

export default useGroupTopic;
