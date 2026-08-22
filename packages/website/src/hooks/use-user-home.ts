import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import type { User } from '@bangumi/client/client.ts';
import { ozaClient } from '@bangumi/client/index.ts';

export function useUserHome(username: string): {
  data: User | undefined;
  mutate: () => Promise<unknown>;
} {
  const { data, mutate } = useSWR(
    `user-home ${username}`,
    async () => ok(ozaClient.getUser(username)),
    { suspense: true },
  );

  return { data, mutate };
}
