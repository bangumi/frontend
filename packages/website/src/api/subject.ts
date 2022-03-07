import { request } from './request'
import { Subject } from '../types/common'
import { AxiosResponse } from 'axios'

type SubjectId = string

export const getSubject = (subjectId: SubjectId): Promise<AxiosResponse<Subject>> => {
  return request(`/v0/subjects/${subjectId}`)
}
