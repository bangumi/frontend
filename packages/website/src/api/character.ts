import { request } from './request'
import { CharacterDetail } from '../types/common'
import { AxiosResponse } from 'axios'

type CharacterId = string

export const getCharacterDetail = (characterId: CharacterId): Promise<AxiosResponse<CharacterDetail>> => {
  return request(`/v0/characters/${characterId}`)
}
