import { ok } from '@oazapfts/runtime';
import useSWR from 'swr';

import { ozaClient } from '@bangumi/client';
import type { GroupMember } from '@bangumi/client/client';
import { GroupMemberRole } from '@bangumi/client/client';
import type { PaginationQuery } from '@bangumi/client/common';

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
    disable
      ? null
      : `listGroupMembers ${name} ${role ?? GroupMemberRole.Member} ${limit} ${offset}`,
    async () => ok(ozaClient.getGroupMembers(name, { limit, offset, role })),
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
