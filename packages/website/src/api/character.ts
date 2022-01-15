import { request } from './request'
import { CharacterDetail } from '../types/common'
import { AxiosPromise } from 'axios'

type CharacterId = string;

export const getCharacterDetail = (characterId:CharacterId):AxiosPromise<CharacterDetail> => {
  return request(`/v0/characters/${characterId}`)
}
