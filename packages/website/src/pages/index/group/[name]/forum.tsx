import { Pagination } from '@bangumi/design'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGroupTopic } from '@bangumi/website/hooks/use-group'
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination'
import TopicsTable from './components/TopicsTable'
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate'

const GroupForum = () => {
  const { name } = useParams()
  // const navigate = useNavigate()
  const [, navigate] = useTransitionNavigate()
  const { curPage, offset, pageSize } = usePaginationParams()

  const topics = useGroupTopic(name!, {
    offset,
    limit: pageSize
  })

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` })
  }

  // TODO @waua ErrorBoundary
  return (
    <>
      <TopicsTable topics={topics.data} />
      <Pagination total={topics.total} pageSize={pageSize} currentPage={curPage} onChange={handlePageChange} />
    </>
  )
}

export default GroupForum
