import { GroupTopics, Group } from '@bangumi/types/group'
import useSWR from 'swr'
import { AxiosResponse } from 'axios'
import { privateRequest } from '../api/request'

type TopicsResp = {
  group?: Group
} & GroupTopics

interface UseGroupTopic {
  topicDetail: TopicsResp
}

function useGroupTopic (id: string): UseGroupTopic {
  // todo
  const { data: { data: topicDetail } = {} } = useSWR<AxiosResponse>(`/p/groups/-/topics/${id}`, privateRequest.get)
  return { topicDetail }
}

export default useGroupTopic
