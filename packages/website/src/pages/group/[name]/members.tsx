import { Pagination, Section, Tab } from '@bangumi/design'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GlobalLayout from '../../../components/GlobalLayout'
import { useGroup } from '../../../hooks/use-group'
import { useQuery } from '../../../hooks/use-query'
import { GroupHeader } from './components/GroupHeader'
import { useGroupMembers } from '../../../hooks/use-group-members'
import { UserCard } from './components/UserCard'
import styles from './members.module.less'

const GroupMembers: React.FC = () => {
  const query = useQuery()
  const unsafePage = parseInt(query.get('page'))
  const pageIndex = (Number.isNaN(unsafePage) || unsafePage < 1) ? 1 : unsafePage
  const { name } = useParams()
  const { group } = useGroup(name as string)
  const { data: groupModMembers } = useGroupMembers(name as string, pageIndex - 1, 'mod')
  const { data, total } = useGroupMembers(name as string, pageIndex - 1, 'normal')
  const navigate = useNavigate()

  if (!name || !group) {
    return null
  }

  const tabs = [
    {
      key: 'index',
      label: '小组概览'
    },
    {
      key: 'members',
      label: '小组成员'
    }
  ]

  const handlePageChange = (page: number): void => {
    navigate({ search: `page=${page}` })
  }

  return (
    <GlobalLayout>
      <div className={styles.pageContainer}>
        <GroupHeader group={group} />
        <Tab type="borderless" items={tabs} activeKey="members" />

        <div className={styles.columnContainer}>
          <div className={styles.leftCol}>
            {
            // TODO: 遵循旧站的交互规则，可能需要改动
            pageIndex === 1 &&
              <Section title="小组管理员">
                <div className={styles.members}>
                  {(groupModMembers ?? []).map((member) => {
                    return (
                      <UserCard
                        mode="horizontal"
                        user={{ ...member, avatar: member.avatar.large }}
                        key={member.id}
                      />
                    )
                  })}
                </div>
              </Section>
          }
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
            </Section>
          </div>
        </div>

        <Pagination total={total} currentOffset={pageIndex} onChange={handlePageChange} />
      </div>
    </GlobalLayout>
  )
}

export default GroupMembers
