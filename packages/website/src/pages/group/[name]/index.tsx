import { Tab, Section, Typography } from '@bangumi/design'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { useParams } from 'react-router-dom'
import GlobalLayout from '../../../components/GlobalLayout'
import { useGroup } from '../../../hooks/use-group'
import { GroupHeader } from './components/GroupHeader'
import styles from './index.module.less'
import { render as renderBBCode } from '@bangumi/utils'
import { UserCard } from './components/UserCard'
import { getGroupTopicLink, getUserProfileLink } from '../../../utils/pages'
import dayjs from 'dayjs'

const { Link } = Typography

const GroupHome: React.FC = () => {
  const { name } = useParams()
  const { group, recentTopics } = useGroup(name as string)
  const descRef = useRef<HTMLDivElement>(null)
  const [isClampEnabled, setClampEnabled] = useState(false)
  const [isClamped] = useState<boolean>(true)

  useEffect(() => {
    if (!descRef) {
      return undefined
    }

    if (descRef.current) {
      descRef.current.classList.add(styles.clamped)
      if (descRef.current.scrollHeight > descRef.current.clientHeight) {
        setClampEnabled(true)
      }
    }
  }, [group])

  if (!group) {
    return null
  }

  const tabs = [{
    key: 'index',
    label: '小组概览'
  }]

  // TODO: XSS defense
  const parsedDescription = renderBBCode(group.description)

  const renderRecentTopics = (): ReactElement | null => {
    if (!recentTopics) {
      return null
    }

    return (
      <table className={styles.topicTable}>
        <thead>
          <tr>
            <th>标题</th>
            <th>作者</th>
            <th>回复数</th>
            <th>最后回复于</th>
          </tr>
        </thead>
        <tbody>
          {recentTopics.map((topic) => {
            return (
              <tr key={topic.id}>
                <td>
                  <Link to={getGroupTopicLink(topic.id)} fontWeight="bold" isExternal>
                    {topic.title}
                  </Link>
                </td>
                <td>
                  <Link to={getUserProfileLink(topic.creator.username)} fontWeight="bold" isExternal>
                    {topic.creator.nickname}
                  </Link>
                </td>
                <td>
                  {topic.reply_count}
                </td>
                <td>
                  {dayjs(topic.updated_at).format('YYYY-M-D')}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  const renderClampToggle = (): ReactElement | null => {
    if (!isClampEnabled) {
      return null
    }

    return <div className={styles.clampControlButton}>{isClamped ? '展开' : '收起'}</div>
  }

  return (
    <GlobalLayout>
      <div className={styles.pageContainer}>
        <GroupHeader group={group} />
        <Tab type="borderless" items={tabs} activeKey="index" />
        <div className={styles.columnContainer}>
          <div className={styles.leftCol}>
            <div
              ref={descRef}
              className={classnames(styles.description, {
                [styles.clamped]: isClampEnabled && isClamped
              })}
              dangerouslySetInnerHTML={{ __html: parsedDescription }}
            />
            {renderClampToggle()}
            <Section title="最近讨论">
              {renderRecentTopics()}
            </Section>
          </div>
          <div className={styles.rightCol}>
            <Section title="最近加入">
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
