import { ok } from '@oazapfts/runtime';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { Index } from '@bangumi/client/client';

export interface UseIndexRet {
  index: Index;
  mutate: KeyedMutator<Index>;
}

/** 获取目录详情 */
function useIndex(indexId: number): UseIndexRet {
  const { data, mutate } = useSWR(
    `/index/${indexId}`,
    async () => ok(ozaClient.getIndex(indexId)),
    {
      suspense: true,
    },
  );
  return { index: data, mutate };
}

export default useIndex;
