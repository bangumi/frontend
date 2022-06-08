export interface Wiki {
  type: string
  data: WikiItem[]
}

export type WikiItemType = 'array' | 'object'

export class WikiArrayItem {
  k?: string
  v?: string

  constructor (k: string, v: string) {
    k && (this.k = k)
    this.v = v
  }
}

export class WikiItem {
  key?: string
  value?: string
  array?: boolean
  values?: WikiArrayItem[]

  constructor (key: string, value: string, type: WikiItemType) {
    this.key = key
    switch (type) {
      case 'array':
        this.array = true
        this.values = []
        break
      case 'object':
        this.value = value
        break
    }
  }
}
