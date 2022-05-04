// using camelcase api
export type InfoBox = Array<{
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
  infobox: InfoBox
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
  infobox: InfoBox
  volumes: number
  eps: number
  totalEpisodes: number
  rating: rating
  collection: collection
  tags: tag[]
}

export interface RelatedSubject {
  id: number
  staff: string
  name?: string
  nameCn?: string
  image: string
}
