import type { components } from './types'

export * from './common'

export type User = components['schemas']['User']

export enum UserGroup {
  Admin = 1,
  BangumiAdmin = 2,
  DoujinAdmin = 3,
  MutedUser = 4,
  AccessForbiddenUser = 5,
  CharacterAdmin = 8,
  WikiAdmin = 9,
  User = 10,
  WikiContributor = 11
}
