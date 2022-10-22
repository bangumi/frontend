import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { privateRequest } from '../api/request'
import { GroupMember, ResponseWithPagination } from '@bangumi/types/group'

interface UseGroupMembersRet {
  data: GroupMember[] | undefined
  total: number | undefined
  isLoading: boolean
  error: any
}

export function useGroupMembers (name: string, index: number, type: 'mod' | 'normal' | 'all'): UseGroupMembersRet {
  const ignoreIndex = type === 'mod' && index > 0
  const { data, error } = useSWR<AxiosResponse<ResponseWithPagination<GroupMember[]>>>(
    ignoreIndex
      ? null
      : `/p/groups/${name}/members?type=${type}&limit=30&offset=${index * 30}`,
    privateRequest.get
  )

  return {
    data: data?.data.data,
    total: data?.data.total,
    isLoading: !data && !error,
    error
  }
}
