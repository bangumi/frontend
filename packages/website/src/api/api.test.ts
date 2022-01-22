import { getCharacterDetail } from './character'
import { getSubject } from './subject'

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
