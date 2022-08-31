import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { RichContent } from '@bangumi/design'
import GlobalLayout from '../../../../components/GlobalLayout'
import useGroupTopic from '../../../../hooks/use-group-topic'
import GroupTopicHeader from './components/GroupTopicHeader'
import styles from './index.module.less'
import { render as renderBBCode } from '@bangumi/utils'
import TopicComment from './components/TopicComment'

const Topic: FC = () => {
  const { id } = useParams()
  const { topicDetail } = useGroupTopic(id!)
  if (!topicDetail) {
    return null
  }
  const originalPosterId = topicDetail.creator.id
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
          {/* Topic Comments */}
          {
            topicDetail.comments.map((comment, idx) =>
              (
                <TopicComment
                  key={comment.id} {...comment} isReply={false}
                  floor={idx + 2}
                  isOriginalPoster={comment.creator.id === originalPosterId}
                />
              )
            )
          }
        </div>
        <div className={styles.rightCol}>
          RightCol
        </div>
      </div>
    </GlobalLayout>
  )
}
export default Topic
