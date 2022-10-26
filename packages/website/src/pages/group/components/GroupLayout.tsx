import { Section, Tab } from '@bangumi/design'
import React, { PropsWithChildren } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { GroupProfile } from '@bangumi/types/group'
import { GroupHeader } from './GroupHeader'
import styles from './GroupLayout.module.less'
import CommonStyles from '../common.module.less'
import { ReactComponent as RightArrow } from '@bangumi/website/assets/right-arrow.svg'
import { UserCard } from './UserCard'
import { keyBy } from '@bangumi/utils'

export enum GroupTabs{
  Index = 'index',
  Forum = 'forum',
  Members = 'members'
}

const GroupTabsItems = [{
  key: GroupTabs.Index,
  label: '小组概览',
  to: (groupName: string) => `/group/${groupName}`
}, {
  key: GroupTabs.Forum,
  label: '小组讨论',
  to: (groupName: string) => `/group/${groupName}/forum`
}, {
  key: GroupTabs.Members,
  label: '小组成员',
  to: (groupName: string) => `/group/${groupName}/members`
}]
const groupTabsByKey = keyBy(GroupTabsItems, 'key')

const GroupLayout: React.FC<PropsWithChildren<{group: GroupProfile|undefined, curTab: GroupTabs}>> = ({ group, children, curTab }) => {
  const navigate = useNavigate()
  const handleTabChange = (key: string): void => group && navigate(groupTabsByKey[key as GroupTabs].to(group.name))
  return (
    <div className={styles.pageContainer}>
      <GroupHeader group={group} />
      <Tab type="borderless" items={GroupTabsItems} activeKey={curTab} onChange={handleTabChange} />
      <div className={styles.columnContainer}>
        <div className={styles.leftCol}>
          {children}
        </div>
        <div className={styles.rightCol}>
          <Section
            title="最近加入" renderFooter={() => (
              group &&
                <Link to={groupTabsByKey.members.to(group.name)} className={CommonStyles.textButton}>
                  <span>更多小组成员</span><RightArrow />
                </Link>
            )}
          >
            <div className={styles.newMembers}>
              {group?.new_members.slice(0, 10).map((member) => {
                return (
                  <UserCard user={{ ...member, avatar: member.avatar.large }} key={member.id} />
                )
              })}
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

export default GroupLayout
