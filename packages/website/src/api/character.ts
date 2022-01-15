import { request } from './request'
import { CharacterDetail } from '../types/common'
import { AxiosPromise } from 'axios'

const api = {
  getCharacterDetail: '/v0/characters/'
}

type CharacterId = string;

export const getCharacterDetail = (characterId:CharacterId):AxiosPromise<CharacterDetail> => {
  return request(api.getCharacterDetail + characterId)
}
