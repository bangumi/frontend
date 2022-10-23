import { Section, Tab } from '@bangumi/design'
import React, { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Group } from '@/types/common'
import { GroupHeader } from './GroupHeader'
import styles from './GroupLayout.module.less'
import CommonStyles from '../common.module.less'
import { getGroupMemberPage } from '@/utils/pages'
import { ReactComponent as RightArrow } from '@/assets/right-arrow.svg'
import { UserCard } from './UserCard'
import { keyBy } from '@/utils'

export enum GroupTabs{
  Index = 'index',
  Forum = 'forum',
  Members = 'members'
}

const GroupTabsItemsItems = [{
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

const GroupLayout: React.FC<PropsWithChildren<{group: Group, curTab: GroupTabs}>> = ({ group, children, curTab }) => {
  const navigate = useNavigate()
  const groupTabsByKey = keyBy(GroupTabsItemsItems, 'key')
  const handleTabChange = (key: string): void => navigate(groupTabsByKey[key].to(group.name))
  return (
    <div className={styles.pageContainer}>
      <GroupHeader group={group} />
      <Tab type="borderless" items={GroupTabsItemsItems} activeKey={curTab} onChange={handleTabChange} />
      <div className={styles.columnContainer}>
        <div className={styles.leftCol}>
          {children}
        </div>
        <div className={styles.rightCol}>
          <Section
            title="最近加入" renderFooter={() => (
              <a
                className={CommonStyles.textButton}
                href={getGroupMemberPage(group.name)}
              >
                <span>更多小组成员</span><RightArrow />
              </a>
            )}
          >
            <div className={styles.newMembers}>
              {group.new_members.slice(0, 10).map((member) => {
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
