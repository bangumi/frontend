import useSWR from 'swr';

import { api } from '@bangumi/client';
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
    disable ? null : api.listGroupMembersByName.swrKey({ name }, { type, limit, offset }),
    api.listGroupMembersByName.fetcher,
    { suspense: true },
  );

  return data ?? { data: undefined, total: undefined };
}
