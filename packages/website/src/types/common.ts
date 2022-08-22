import { User } from './user'

// using camelcase api
type infoBox = Array<{
  key: string
  value: string | Array<{
    k?: string
    v: string
  }>
}>

interface images {
  large: string
  common: string
  medium: string
  small: string
  grid: string
}

interface count {
  '1': number
  '2': number
  '3': number
  '4': number
  '5': number
  '6': number
  '7': number
  '8': number
  '9': number
  '10': number
}

interface rating {
  rank: number
  total: number
  count: count
  score: number
}

interface collection {
  wish: number
  collect: number
  doing: number
  onHold: number
  dropped: number
}

interface tag {
  name: string
  count: number
}

export interface CharacterDetail {
  id: number
  name: string
  type: number
  images: {
    large: string
    medium: string
    small: string
    grid: string
  }
  summary: string
  locked: boolean
  infobox: infoBox
  gender: string
  blooType: number
  birthYear: number
  birthMon: number
  birthDay: number
  stat: {
    comments: number
    collects: number
  }
}

export interface Subject {
  id: number
  name: string
  type: number
  nameCn: string
  summary: string
  nsfw: boolean
  locked: boolean
  date: string // YYYY-MM-DD format
  platform: string
  images: images
  infobox: infoBox
  volumes: number
  eps: number
  totalEpisodes: number
  rating: rating
  collection: collection
  tags: tag[]
}

export interface AvatarSet {
  large: string
  medium: string
  small: string
}

export interface Group {
  title: string
  created_at: string
  description: string
  total_members: number
  icon: string
  new_members: Array<{
    joined_at: string
    avatar: AvatarSet
    username: string
    nickname: string
    id: number
  }>
}

export interface Topic {
  created_at: string
  updated_at: string
  title: string
  creator: User
  id: 371781
  reply_count: 10
}

export interface Pagination {
  total: number
  limit: number
  offset: number
}

export interface ResponseWithPagination<T> extends Pagination {
  data: T
}

/* Todo: refactor types usage
* 目前引入 type 可能需要 ../../../../types/common 这样引用
* 同时 Group 和 Character / User 的类型可以分开到不同文件
*  */

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

export interface GroupTopicDetail {
  created_at: Date
  updated_at: Date
  title: string
  creator: Creator
  text: string
  comments: Comment[]
  id: number
  is_friend: boolean
  state: number
}
