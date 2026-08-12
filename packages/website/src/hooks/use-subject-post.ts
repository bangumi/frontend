import { ok } from '@oazapfts/runtime';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';

export interface UseSubjectPostRet {
  data: ozaClient.Post;
  mutate: KeyedMutator<ozaClient.Post>;
}

function useSubjectPost(id: number): UseSubjectPostRet {
  const { data, mutate } = useSWR(
    `/subject/post/${id}`,
    async () => ok(ozaClient.getSubjectPost(id)),
    {
      suspense: true,
    },
  );
  return { data, mutate };
}

export default useSubjectPost;
