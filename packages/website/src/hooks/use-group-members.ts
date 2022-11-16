import { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { privateRequest } from '../api/request';
import { GroupMember, Pagination, ResponseWithPagination } from '@bangumi/types/group';

interface UseGroupMembersRet {
  data: GroupMember[] | undefined;
  total: number | undefined;
  isLoading: boolean;
  error: any;
}

type GroupMembersReq = {
  type: 'mod' | 'normal' | 'all';
  disable?: boolean;
} & Partial<Pagination>;

export function useGroupMembers(name: string, options: GroupMembersReq): UseGroupMembersRet {
  const { type, offset = 0, limit = 30, disable = false } = options;
  // const ignoreIndex = type === 'mod' && offset > 0
  const query = new URLSearchParams({
    type,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const { data, error } = useSWR<AxiosResponse<ResponseWithPagination<GroupMember[]>>>(
    disable ? null : `/p/groups/${name}/members?${query.toString()}`,
    privateRequest.get,
    { suspense: true },
  );

  return {
    data: data?.data.data,
    total: data?.data.total,
    isLoading: !data && !error,
    error,
  };
}
