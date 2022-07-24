import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { privateRequest } from '../api/request'
import { Group, ResponseWithPagination, Topic } from '../types/common'

interface UseGroupRet {
  group: Group | undefined
  recentTopics: Topic[] | undefined
}

export function useGroup (name: string): UseGroupRet {
  const { data: groupResp } = useSWR<AxiosResponse<Group>>(`/p/groups/${name}`, privateRequest.get)
  const { data: recentTopicsResp } = useSWR<AxiosResponse<ResponseWithPagination<Topic[]>>>(`/p/groups/${name}/topics?limit=10`, privateRequest.get)

  return {
    group: groupResp?.data,
    recentTopics: recentTopicsResp?.data.data
  }
}
