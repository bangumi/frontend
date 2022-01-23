import { rest } from 'msw'
import SubjectResponse from './fixtures/subject.json'
import CharacterOfPersonResponse from './fixtures/character.json'
import CharacterResponse from './fixtures/characters-39115.json'

export const handlers = [
  rest.get('https://api.bgm.tv/v0/subjects/:subjectId', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(SubjectResponse)
    )
  }),

  rest.get('https://api.bgm.tv/v0/persons/123/characters', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(CharacterOfPersonResponse)
    )
  }),

  rest.get('https://api.bgm.tv/v0/characters/:characterId', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(CharacterResponse)
    )
  })
]
