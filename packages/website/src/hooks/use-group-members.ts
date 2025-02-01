import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { GroupMember, PaginationQuery } from '@bangumi/client/group';

interface UseGroupMembersRet {
  data: GroupMember[] | undefined;
  total: number | undefined;
}

type GroupMembersReq = {
  moderator?: boolean;
  disable?: boolean;
} & Partial<PaginationQuery>;

export function useGroupMembers(
  name: string,
  { moderator, offset = 0, limit = 30, disable = false }: GroupMembersReq,
): UseGroupMembersRet {
  const { data } = useSWR(
    disable ? null : `listGroupMembers ${name} ${moderator ? 'mod' : 'normal'} ${limit} ${offset}`,
    async () => ok(ozaClient.getGroupMembers(name, { limit, offset, moderator })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
