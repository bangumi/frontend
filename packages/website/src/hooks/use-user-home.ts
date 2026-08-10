import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { User } from '@bangumi/client/client';

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
