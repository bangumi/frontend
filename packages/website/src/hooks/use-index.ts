import { ok } from '@oazapfts/runtime';
import type { KeyedMutator } from 'swr';
import useSWR from 'swr';

import type { Index } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

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
