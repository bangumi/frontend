import { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { privateRequest } from '../api/request'
import { Group, Pagination, ResponseWithPagination, Topic } from '../types/common'

export enum DescriptionClamp {
  clamp = 'clamp',
  unclamp = 'unclamp'
}

export type TopicApiRes = ResponseWithPagination<Topic[]>|undefined
export interface UseGroupRet {
  group: Group | undefined
  descriptionClamp: DescriptionClamp
  setDescriptionClamp: (val: DescriptionClamp) => void
}

export function useGroupTopic (name: string, pagination?: Partial<Pagination>): TopicApiRes {
  const params = new URLSearchParams()
  if (pagination) {
    const { limit = 20, offset } = pagination
    params.append('offset', String(offset))
    params.append('limit', String(limit))
  }
  const { data: recentTopicsResp } = useSWR<AxiosResponse<TopicApiRes>>(`/p/groups/${name}/topics?${params.toString()}`, privateRequest.get)
  return recentTopicsResp?.data
}

export function useGroup (name: string): UseGroupRet {
  const { data: groupResp } = useSWR<AxiosResponse<Group>>(`/p/groups/${name}`, privateRequest.get)
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
