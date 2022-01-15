import { request } from './request'
import { CharacterDetail } from '../types/common'
import { AxiosPromise } from 'axios'

const api = {
  getCharacterDetail: '/v0/characters/'
}

export const getCharacterDetail = (characterId:string|number):AxiosPromise<CharacterDetail> => {
  return request(api.getCharacterDetail + characterId)
}
