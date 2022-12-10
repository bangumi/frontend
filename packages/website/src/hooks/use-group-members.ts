import { ok } from 'oazapfts';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { GroupMember, Pagination } from '@bangumi/client/group';

interface UseGroupMembersRet {
  data: GroupMember[] | undefined;
  total: number | undefined;
}

type GroupMembersReq = {
  type: 'mod' | 'normal' | 'all';
  disable?: boolean;
} & Partial<Pagination>;

export function useGroupMembers(
  name: string,
  { type, offset = 0, limit = 30, disable = false }: GroupMembersReq,
): UseGroupMembersRet {
  const { data } = useSWR(
    disable ? null : `listGroupMembersByName ${name} ${type} ${limit} ${offset}`,
    async () => ok(ozaClient.listGroupMembersByName(name, { limit, offset, $type: type })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
