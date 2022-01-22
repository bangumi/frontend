import { request } from './request'
import { Subject } from '../types/common'
import { AxiosPromise } from 'axios'

type SubjectId = string;

export const getSubject = (subjectId:SubjectId):AxiosPromise<Subject> => {
  return request(`/v0/subjects/${subjectId}`)
}
