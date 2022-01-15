type infoBox = {
  key:string,
  value:string | {
    k:string
    v:string
  }[]
}[]

export type CharacterDetail={
  id: number
  name: string
  type: number
  images: {
    large: string
    medium: string
    small: string
    grid: string
  },
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
