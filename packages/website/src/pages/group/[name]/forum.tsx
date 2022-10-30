import { Pagination } from '@bangumi/design'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGroupTopic } from '@bangumi/website/hooks/use-group'
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination'
import TopicsTable from './components/TopicsTable'

const GroupForum: React.FC = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const { curPage, offset, pageSize } = usePaginationParams()

  const topics = useGroupTopic(name as string, {
    offset,
    limit: pageSize
  })

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` })
  }

  if (!name || !topics) {
    return null
  }

  return (
    <>
      <TopicsTable topics={topics.data} />
      <Pagination total={topics?.total} pageSize={pageSize} currentPage={curPage} onChange={handlePageChange} />
    </>
  )
}

export default GroupForum
