import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { GroupMemberRole } from '@bangumi/client/client';
import type { GroupMember, PaginationQuery } from '@bangumi/client/group';

interface UseGroupMembersRet {
  data: GroupMember[] | undefined;
  total: number | undefined;
}

type GroupMembersReq = {
  role?: GroupMemberRole;
  disable?: boolean;
} & Partial<PaginationQuery>;

export function useGroupMembers(
  name: string,
  { role, offset = 0, limit = 30, disable = false }: GroupMembersReq,
): UseGroupMembersRet {
  const { data } = useSWR(
    disable ? null : `listGroupMembers ${name} ${role ?? 0} ${limit} ${offset}`,
    async () => ok(ozaClient.getGroupMembers(name, { limit, offset, role })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
