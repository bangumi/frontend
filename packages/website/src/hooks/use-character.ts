import { CharacterDetail } from '../types/common'
import useSWR from 'swr'
import { request } from '../api/request'
import { AxiosResponse } from 'axios'

type AugmentedCharacterDetail = CharacterDetail & {
  nameInSimplifiedChinese?: string
}

function argumentCharacter (characterDetail: CharacterDetail): AugmentedCharacterDetail {
  const res = characterDetail.infobox.find(({ key }) => {
    return key === '简体中文名'
  })

  return {
    ...characterDetail,
    nameInSimplifiedChinese: res?.value as string
  }
}

export function useCharacter (id: string): {data?: AugmentedCharacterDetail, isLoading: boolean, isError: any} {
  const { data, error } = useSWR<AxiosResponse<CharacterDetail>>(
    `v0/characters/${id}`,
    request.get,
    {
      revalidateOnFocus: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false
    }
  )

  return {
    data: data ? argumentCharacter(data.data) : undefined,
    isLoading: !error && !data,
    isError: error
  }
}
