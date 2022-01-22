import { getCharacterDetail } from './character'
import { getSubject } from './subject'
import { request } from './request'

it('get CharacterDetail correctly', async () => {
  const res = await getCharacterDetail('39115')
  expect(res.data.birthDay).toBe(27)
  expect(res.data.birthMon).toBe(3)
})

it('get Subject correctly', async () => {
  const res = await getSubject('39115')
  expect(res.data.totalEpisodes).toBe(0)
  expect(res.data.date).toBe('2012-04-26')
})

// test object in an array
it('underscodeToCamelcase correctly', async () => {
  const res = await request('/v0/persons/123/characters')
  expect(res.data[0].subjectNameCn).toBe('美少女战士')
})
