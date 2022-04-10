import { request } from './request'
import { User } from '../types/user'

export async function getMe (): Promise< User | null> {
  try {
    const resp = await request('v0/me')
    return resp.data
  } catch {
    // 未登录
    return null
  }
}
