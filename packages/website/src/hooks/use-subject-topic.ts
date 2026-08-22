import { ok } from '@oazapfts/runtime';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import type { SubjectTopic } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

export interface UseSubjectTopicRet {
  data: SubjectTopic;
  mutate: KeyedMutator<SubjectTopic>;
}

function useSubjectTopic(id: number): UseSubjectTopicRet {
  const { data, mutate } = useSWR(
    `/subject/topic/${id}`,
    async () => ok(ozaClient.getSubjectTopic(id)),
    {
      suspense: true,
    },
  );
  return { data, mutate };
}

export default useSubjectTopic;
