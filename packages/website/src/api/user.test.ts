import { getMe } from './user'

describe('getMe', () => {
  it('should return correct user information', async () => {
    const user = await getMe()

    expect(user?.avatar).toStrictEqual({
      large: 'https://lain.bgm.tv/pic/user/l/000/18/66/186665.jpg?r=1502208749',
      medium: 'https://lain.bgm.tv/pic/user/m/000/18/66/186665.jpg?r=1502208749',
      small: 'https://lain.bgm.tv/pic/user/s/000/18/66/186665.jpg?r=1502208749'
    })

    expect(user?.sign).toBe('sign')
    expect(user?.url).toBe('https://bgm.tv/user/user')
    expect(user?.username).toBe('user')
    expect(user?.nickname).toBe('user')
    expect(user?.id).toBe(123456)
    expect(user?.userGroup).toBe(11)
  })
})
