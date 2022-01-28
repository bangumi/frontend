import { mockAPI } from './utils'

const BASE_URL = 'https://api.bgm.tv'

function buildAPIURL (path: string) {
  return `${BASE_URL}${path}`
}

export const handlers = [
  mockAPI(buildAPIURL('/v0/subjects/:subjectId'), 'get'),
  mockAPI(buildAPIURL('/v0/persons/:personId/characters'), 'get'),
  mockAPI(buildAPIURL('/v0/characters/:characterId'), 'get')
]
