import { Typography } from '@bangumi/design'
import { Topic } from '@bangumi/types/common'
import {
  getGroupTopicLink,
  getUserProfileLink,
} from '@bangumi/website/utils/pages'
import React from 'react'
import dayjs from 'dayjs'
import styles from './TopicsTable.module.less'

const TopicsTable: React.FC<{ topics: Topic[] }> = ({ topics }) => {
  return (
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
        {topics.map((topic) => {
          return (
            <tr key={topic.id}>
              <td className={styles.title}>
                {/* TODO: replace to Link */}
                <Typography.Link
                  to={getGroupTopicLink(topic.id)}
                  fontWeight="bold"
                  isExternal
                >
                  {topic.title}
                </Typography.Link>
              </td>
              <td className={styles.author}>
                <Typography.Link
                  to={getUserProfileLink(topic.creator.username)}
                  fontWeight="bold"
                  isExternal
                >
                  {topic.creator.nickname}
                </Typography.Link>
              </td>
              <td className={styles.replies}>{topic.reply_count}</td>
              <td className={styles.updateTime}>
                {dayjs(topic.updated_at).format('YYYY-M-D')}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TopicsTable
