import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { EditorForm, RichContent, Avatar } from '@bangumi/design'
import GlobalLayout from '../../../../components/GlobalLayout'
import useGroupTopic from '../../../../hooks/use-group-topic'
import GroupTopicHeader from './components/GroupTopicHeader'
import styles from './index.module.less'
import { render as renderBBCode } from '@bangumi/utils'
import TopicComment from './components/TopicComment'
import { useUser } from '../../../../hooks/use-user'

const Topic: FC = () => {
  const { id } = useParams()
  const { topicDetail } = useGroupTopic(id!)
  const { user } = useUser()
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
          <div className={styles.replies}>
            {
              topicDetail.comments.map((comment, idx) =>
                (
                  <TopicComment
                    key={comment.id}
                    isReply={false}
                    floor={idx + 2}
                    originalPosterId={originalPosterId}
                    {...comment}
                  />
                )
              )
            }
          </div>
          {/* Reply BBCode Editor */}
          {
            user && (
              <div className={styles.replyFormContainer}>
                <Avatar src={user.avatar.medium} size="medium" />
                <EditorForm
                  className={styles.replyForm}
                  placeholder="添加新回复..."
                />
              </div>
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
