import { ok } from 'oazapfts';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';

export interface UseGroupPostRet {
  data: ozaClient.GroupReply;
  mutate: KeyedMutator<ozaClient.GroupReply>;
}

function useGroupPost(id: number): UseGroupPostRet {
  const { data, mutate } = useSWR(`/group/post/${id}`, async () => ok(ozaClient.getGroupPost(id)), {
    suspense: true,
  });
  return { data, mutate };
}

export default useGroupPost;
