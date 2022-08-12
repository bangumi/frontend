import { Section, Tab } from '@bangumi/design'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalLayout from '../../../components/GlobalLayout'
// TODO: 复用GroupHome的组件
// import { useGroup } from '../../../hooks/use-group'
// import { GroupHeader } from './components/GroupHeader'
import { useGroupMembers } from '../../../hooks/use-group-members'
import { UserCard } from './components/UserCard'
import styles from './members.module.less'

const GroupMembers: React.FC = () => {
  const { name } = useParams()
  // const { group } = useGroup(name as string)
  const [pageIndex, setPageIndex] = useState(() => 0)
  const { data: groupModMembers } = useGroupMembers(name as string, pageIndex, 'mod')
  const { data } = useGroupMembers(name as string, pageIndex, 'normal')

  // if (!name || !group) {
  if (!name) {
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

  return (
    <GlobalLayout>
      <div className={styles.pageContainer}>
        {/* <GroupHeader group={group} /> */}
        <Tab type="borderless" items={tabs} activeKey="members" />

        <div className={styles.columnContainer}>
          <div className={styles.leftCol}>
            {
            // TODO: 遵循旧站的交互规则，可能需要改动
            pageIndex === 0 &&
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

        <div>
          {/* 临时分页 */}
          <button onClick={() => setPageIndex(pageIndex - 1)}>后退一下</button>
          <span> {pageIndex} </span>
          <button onClick={() => setPageIndex(pageIndex + 1)}>前进一下</button>
        </div>
      </div>
    </GlobalLayout>
  )
}

export default GroupMembers
