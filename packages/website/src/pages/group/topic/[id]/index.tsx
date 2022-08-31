import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { RichContent } from '@bangumi/design'
import GlobalLayout from '../../../../components/GlobalLayout'
import useGroupTopic from '../../../../hooks/use-group-topic'
import GroupTopicHeader from './components/GroupTopicHeader'
import styles from './index.module.less'
import { render as renderBBCode } from '@bangumi/utils'

const Topic: FC = () => {
  const { id } = useParams()
  const { topicDetail } = useGroupTopic(id!)
  if (!topicDetail) {
    return null
  }
  const parsedText = renderBBCode(topicDetail.text)
  return (
    <GlobalLayout>
      <GroupTopicHeader
        title={topicDetail.title}
        creator={topicDetail.creator}
        createdAt={topicDetail.created_at}
        group={topicDetail.group}
      />
      <div className={styles.columnContainer}>
        <div className={styles.leftCol}>
          {/* Topic content */}
          <RichContent html={parsedText} />
          {/* Topic replies */}
        </div>
        <div className={styles.rightCol}>
          RightCol
        </div>
      </div>
    </GlobalLayout>
  )
}
export default Topic
