// Todo
export interface AvatarSet {
  large: string
  medium: string
  small: string
}

export interface Creator {
  avatar: AvatarSet
  sign: string
  url: string
  username: string
  nickname: string
  id: number
  user_group: number
}

export interface Reply {
  created_at: Date
  text: string
  creator: Creator
  is_friend: boolean
  state: number
  id: number
}

export interface Comment {
  created_at: Date
  text: string
  creator: Creator
  replies: Reply[]
  id: number
  is_friend: boolean
  state: number
}

export interface GroupTopicGroupInfo {
  id: number
  name: string
  created_at: string
  title: string
  icon: string
  description: string
  total_members: number
}

export interface GroupTopicDetail {
  group: GroupTopicGroupInfo
  created_at: Date | string
  updated_at: Date | string
  title: string
  creator: Creator
  text: string
  comments: Comment[]
  id: number
  is_friend: boolean
  state: number
}
