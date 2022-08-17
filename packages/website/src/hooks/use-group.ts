import { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { privateRequest } from '../api/request'
import { Group, ResponseWithPagination, Topic } from '../types/common'

export enum DescriptionClamp {
  clamp = 'clamp',
  unclamp = 'unclamp'
}

interface UseGroupRet {
  group: Group | undefined
  recentTopics: Topic[] | undefined
  descriptionClamp: DescriptionClamp
  setDescriptionClamp: (val: DescriptionClamp) => void
}

export function useGroup (name: string): UseGroupRet {
  const { data: groupResp } = useSWR<AxiosResponse<Group>>(`/p/groups/${name}`, privateRequest.get)
  const { data: recentTopicsResp } = useSWR<AxiosResponse<ResponseWithPagination<Topic[]>>>(`/p/groups/${name}/topics?limit=10`, privateRequest.get)

  const clampKey = `doesGroupDescriptionNeedClamp.${name}`
  const descriptionClamp = localStorage.getItem(clampKey) as DescriptionClamp ?? DescriptionClamp.unclamp
  const [descriptionClampState, setDescriptionClampState] = useState<DescriptionClamp>(descriptionClamp)

  useEffect(() => {
    localStorage.setItem(clampKey, descriptionClampState)
  }, [descriptionClampState])

  return {
    group: groupResp?.data,
    recentTopics: recentTopicsResp?.data.data,
    descriptionClamp: descriptionClampState,
    setDescriptionClamp (val) {
      setDescriptionClampState(val)
    }
  }
}
