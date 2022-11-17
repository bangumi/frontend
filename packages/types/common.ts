import type { components } from './types'

export type User = components['schemas']['User']
export type Avatar = components['schemas']['Avatar']
export type Topic = components['schemas']['Topic']
export type Pagination = Omit<components['schemas']['Paged'], 'data'>

export interface ResponseWithPagination<T = unknown> extends Pagination {
  data: T
}
