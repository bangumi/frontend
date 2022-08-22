import { GroupTopicDetail } from '../types/common'
import useSWR from 'swr'
import { AxiosResponse } from 'axios'
import { privateRequest } from '../api/request'

interface UseGroupTopic {
  topicDetail: GroupTopicDetail | undefined
}

function useGroupTopic (id: string): UseGroupTopic {
  // todo
  const { data: { data: topicDetail } = {} } = useSWR<AxiosResponse<GroupTopicDetail>>(`/p/groups/boring/topics/${id}`, privateRequest.get)
  return { topicDetail }
}

export default useGroupTopic
