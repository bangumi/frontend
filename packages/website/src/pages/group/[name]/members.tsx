import { Pagination, Section } from '@bangumi/design'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGroupMembers } from '@bangumi/website/hooks/use-group-members'
import { UserCard } from '../components/UserCard'
import styles from './members.module.less'
import { usePaginationParams } from '@bangumi/website/hooks/use-pagination'

const GroupMembers: React.FC = () => {
  // TODO: useGroupMembers 中使用 limit=30
  const { curPage } = usePaginationParams(30)
  const { name } = useParams()
  const { data: groupModMembers } = useGroupMembers(name as string, curPage - 1, 'mod')
  const { data, total } = useGroupMembers(name as string, curPage - 1, 'normal')
  const navigate = useNavigate()

  if (!name) {
    return null
  }

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` })
  }

  // TODO: 遵循旧站的交互规则，可能需要改动
  return (
    <>
      {curPage === 1 &&
        <Section title="小组管理员">
          <div className={styles.members}>
            {(groupModMembers ?? []).map((member) =>
              <UserCard
                mode="horizontal"
                user={{ ...member, avatar: member.avatar.large }}
                key={member.id}
              />
            )}
          </div>
        </Section>}
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
        <Pagination total={total} currentOffset={curPage} onChange={handlePageChange} />
      </Section>
    </>
  )
}

export default GroupMembers
