import { ok } from '@oazapfts/runtime';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client/index.ts';
import type { GroupTopic } from '@bangumi/client/topic.ts';

export interface UseGroupTopicRet {
  data: GroupTopic;
  mutate: KeyedMutator<GroupTopic>;
}

function useGroupTopic(id: number): UseGroupTopicRet {
  const { data, mutate } = useSWR(
    `/group/topic/${id}`,
    async () => ok(ozaClient.getGroupTopic(id)),
    {
      suspense: true,
    },
  );
  return { data, mutate };
}

export default useGroupTopic;
