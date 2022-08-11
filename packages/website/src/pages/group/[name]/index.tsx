import { Tab, Section, Typography } from '@bangumi/design'
import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import GlobalLayout from '../../../components/GlobalLayout'
import { useGroup } from '../../../hooks/use-group'
import { GroupHeader } from './components/GroupHeader'
import styles from './index.module.less'
import { render as renderBBCode } from '@bangumi/utils'
import { UserCard } from './components/UserCard'
import { getGroupForumPage, getGroupMemberPage, getGroupTopicLink, getUserProfileLink } from '../../../utils/pages'
import dayjs from 'dayjs'
import { ClampableContent } from './components/ClampableContent'
import { ReactComponent as RightArrow } from '../../../assets/right-arrow.svg'

const { Link } = Typography

const CLAMP_HEIGHT_THRESHOLD = 193

const GroupHome: React.FC = () => {
  const { name } = useParams()
  const { group, recentTopics } = useGroup(name as string)

  if (!name || !group) {
    return null
  }

  const tabs = [{
    key: 'index',
    label: '小组概览'
  }]

  const renderRecentTopics = (): ReactElement | null => {
    if (!recentTopics) {
      return null
    }

    return (
      <>
        <table className={styles.topicTable}>
          <thead>
            <tr>
              <th className={styles.title}>标题</th>
              <th className={styles.author}>作者</th>
              <th className={styles.replies}>回复数</th>
              <th className={styles.updateTime}>最后回复于</th>
            </tr>
          </thead>
          <tbody>
            {recentTopics.map((topic) => {
              return (
                <tr key={topic.id}>
                  <td className={styles.title}>
                    <Link to={getGroupTopicLink(topic.id)} fontWeight="bold" isExternal>
                      {topic.title}
                    </Link>
                  </td>
                  <td className={styles.author}>
                    <Link to={getUserProfileLink(topic.creator.username)} fontWeight="bold" isExternal>
                      {topic.creator.nickname}
                    </Link>
                  </td>
                  <td className={styles.replies}>
                    {topic.reply_count}
                  </td>
                  <td className={styles.updateTime}>
                    {dayjs(topic.updated_at).format('YYYY-M-D')}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }

  // TODO: XSS defense
  const parsedDescription = renderBBCode(group.description)

  return (
    <GlobalLayout>
      <div className={styles.pageContainer}>
        <GroupHeader group={group} />
        <Tab type="borderless" items={tabs} activeKey="index" />
        <div className={styles.columnContainer}>
          <div className={styles.leftCol}>
            <ClampableContent threshold={CLAMP_HEIGHT_THRESHOLD} content={parsedDescription} />
            <Section
              title="最近讨论"
              renderFooter={() => (
                <a
                  className={styles.textButton}
                  href={getGroupForumPage(name)}
                >
                  <span>更多组内讨论</span><RightArrow />
                </a>
              )}
            >
              {renderRecentTopics()}
            </Section>
          </div>
          <div className={styles.rightCol}>
            <Section
              title="最近加入" renderFooter={() => (
                <a
                  className={styles.textButton}
                  href={getGroupMemberPage(name)}
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
    </GlobalLayout>
  )
}

export default GroupHome
