import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { privateRequest } from '../api/request'
import { Group } from '../types/common'

interface UseGroupRet {
  group: Group | undefined
}

export function useGroup (name: string): UseGroupRet {
  const { data } = useSWR<AxiosResponse<Group>>(`/p/groups/${name}`, privateRequest.get)

  return {
    group: data?.data
  }
}
