import { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { privateRequest } from '../api/request'
import { GroupProfile, ResponseWithPagination, Topic } from '@bangumi/types/group'

export enum DescriptionClamp {
  clamp = 'clamp',
  unclamp = 'unclamp'
}

interface UseGroupRet {
  group: GroupProfile | undefined
  recentTopics: Topic[] | undefined
  descriptionClamp: DescriptionClamp
  setDescriptionClamp: (val: DescriptionClamp) => void
}

export function useGroup (name: string): UseGroupRet {
  const { data: groupResp } = useSWR<AxiosResponse<GroupProfile>>(`/p/groups/${name}`, privateRequest.get)
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
