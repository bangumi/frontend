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

export interface User {
  id: number
  url: string
  username: string
  nickname: string
  userGroup: UserGroup
  avatar: {
    large: string
    medium: string
    small: string
  }
  sign: string
}
