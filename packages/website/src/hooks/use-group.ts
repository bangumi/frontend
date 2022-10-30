import { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { privateRequest } from '../api/request'
import { GroupProfile, ResponseWithPagination, Topic, Pagination } from '@bangumi/types/group'

export enum DescriptionClamp {
  clamp = 'clamp',
  unclamp = 'unclamp'
}

export type TopicApiRes = ResponseWithPagination<Topic[]>|undefined
export interface UseGroupRet {
  group: GroupProfile | undefined
  descriptionClamp: DescriptionClamp
  setDescriptionClamp: (val: DescriptionClamp) => void
}

export function useGroupTopic (name: string, pagination?: Partial<Pagination>): TopicApiRes {
  const params = new URLSearchParams()
  if (pagination) {
    const { limit = 20, offset = 0 } = pagination
    params.append('offset', offset.toString())
    params.append('limit', limit.toString())
  }
  const { data: recentTopicsResp } = useSWR<AxiosResponse<TopicApiRes>>(`/p/groups/${name}/topics?${params.toString()}`, privateRequest.get)
  return recentTopicsResp?.data
}

export function useGroup (name: string): UseGroupRet {
  const { data: groupResp } = useSWR<AxiosResponse<GroupProfile>>(`/p/groups/${name}`, privateRequest.get)
  const clampKey = `doesGroupDescriptionNeedClamp.${name}`
  const descriptionClamp = localStorage.getItem(clampKey) as DescriptionClamp ?? DescriptionClamp.unclamp
  const [descriptionClampState, setDescriptionClampState] = useState<DescriptionClamp>(descriptionClamp)

  useEffect(() => {
    localStorage.setItem(clampKey, descriptionClampState)
  }, [descriptionClampState])

  return {
    group: groupResp?.data,
    descriptionClamp: descriptionClampState,
    setDescriptionClamp (val) {
      setDescriptionClampState(val)
    }
  }
}
