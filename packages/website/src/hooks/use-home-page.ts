import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { HomeResponse } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

export function useHomePage(): {
  data: HomeResponse | undefined;
  mutate: () => Promise<unknown>;
} {
  const { data, mutate } = useSWR('home-page', async () => ok(ozaClient.getHome()), {
    suspense: true,
  });

  return { data, mutate };
}
