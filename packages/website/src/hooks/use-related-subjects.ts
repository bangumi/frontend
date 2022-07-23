import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { request } from '../api/request'
import { RelatedSubject } from '../types/common'

export function useRelatedSubjectsOfCharacters (characterId: string): {
  data?: RelatedSubject[]
  isLoading: boolean
  error: any
} {
  const { data, error } = useSWR<AxiosResponse<RelatedSubject[]>>(
    `/v0/characters/${characterId}/subjects`,
    request.get,
    // TODO: 用 SWRConfig 配置
    {
      revalidateOnFocus: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false
    }
  )

  return {
    data: data?.data,
    isLoading: !data && !error,
    error
  }
}
