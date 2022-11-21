import useSWR from 'swr';

import { api } from '@bangumi/client';
import type { ApiError } from '@bangumi/client/error';
import type { GroupMember, Pagination, ResponseWithPagination } from '@bangumi/client/group';

interface UseGroupMembersRet {
  data: GroupMember[] | undefined;
  total: number | undefined;
  isLoading: boolean;
  error: unknown;
}

type GroupMembersReq = {
  type: 'mod' | 'normal' | 'all';
  disable?: boolean;
} & Partial<Pagination>;

export function useGroupMembers(
  name: string,
  { type, offset = 0, limit = 30, disable = false }: GroupMembersReq,
): UseGroupMembersRet {
  const { data, error } = useSWR<ResponseWithPagination<GroupMember[]>, ApiError>(
    disable ? null : api.listGroupMembersByName.swrKey({ name }, { type, limit, offset }),
    api.listGroupMembersByName.fetcher,
    { suspense: true },
  );

  return {
    data: data?.data,
    total: data?.total,
    isLoading: !data && error !== undefined,
    error,
  };
}
