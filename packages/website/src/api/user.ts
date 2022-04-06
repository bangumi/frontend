import { request } from './request'
import { BGMUser } from 'bgm-types'

export async function getMe (): Promise<BGMUser.Me | null> {
  try {
    const resp = await request('v0/me')
    return resp.data
  } catch {
    // 未登录
    return null
  }
}
