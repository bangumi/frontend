import { useAsync } from 'react-use'
import { getCharacterDetail } from '../api/character'
import { CharacterDetail } from '../types/common'

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

export function useCharacter (id: string): {value?: AugmentedCharacterDetail, loading: boolean} {
  const state = useAsync(
    async () => {
      const resp = await getCharacterDetail(id)

      return argumentCharacter(resp.data)
    },
    [id]
  )

  return state
}
