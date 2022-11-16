import { Pagination, Section } from '@bangumi/design'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGroupMembers } from '@bangumi/website/hooks/use-group-members'
import { UserCard } from '../components/UserCard'
import styles from './members.module.less'
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination'
import { useTransitionNavigate } from '@bangumi/website/hooks/use-navigate'
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary'

const GroupMembersPage = () => {
  const { curPage, offset, pageSize } = usePaginationParams(30)
  const { name } = useParams()

  // 仅第一页获取管理员
  const { data: groupModMembers } = useGroupMembers(name as string, {
    offset,
    type: 'mod',
    disable: curPage > 1,
  })

  const { data, total } = useGroupMembers(name as string, {
    offset,
    limit: pageSize,
    type: 'normal',
  })
  const [, navigate] = useTransitionNavigate()

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` })
  }

  // TODO: 遵循旧站的交互规则，可能需要改动
  return (
    <>
      {curPage === 1 && (
        <Section title="小组管理员">
          <div className={styles.members}>
            {(groupModMembers ?? []).map((member) => (
              <UserCard
                mode="horizontal"
                user={{ ...member, avatar: member.avatar.large }}
                key={member.id}
              />
            ))}
          </div>
        </Section>
      )}
      <Section title="小组成员">
        <div className={styles.members}>
          {(data ?? []).map((member) => {
            return (
              <UserCard
                mode="horizontal"
                user={{ ...member, avatar: member.avatar.large }}
                key={member.id}
              />
            )
          })}
        </div>
        <Pagination
          total={total}
          currentPage={curPage}
          onChange={handlePageChange}
        />
      </Section>
    </>
  )
}

export default withErrorBoundary(GroupMembersPage)
