import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { EditorForm, RichContent, Avatar, Section, Typography, Button, Topic } from '@bangumi/design'
import GlobalLayout from '../../../../components/GlobalLayout'
import useGroupTopic from '../../../../hooks/use-group-topic'
import GroupTopicHeader from './components/GroupTopicHeader'
import styles from './index.module.less'
import { render as renderBBCode } from '@bangumi/utils'
import { ClampableContent } from '../../components/ClampableContent'
import { useUser } from '../../../../hooks/use-user'
import { getGroupForumPage } from '../../../../utils/pages'

const { Link } = Typography

const CLAMP_HEIGHT_THRESHOLD = 193

const { Comment } = Topic

const TopicPage: FC = () => {
  const { id } = useParams()
  const { topicDetail } = useGroupTopic(id!)
  const { user } = useUser()
  if (!topicDetail) {
    return null
  }
  const originalPosterId = topicDetail.creator.id
  const parsedText = renderBBCode(topicDetail.text)
  const isClosed = topicDetail.state === 1
  const { group } = topicDetail
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
                  <Comment
                    key={comment.id}
                    isReply={false}
                    floor={idx + 2}
                    originalPosterId={originalPosterId}
                    user={user}
                    {...comment}
                  />
                )
              )
            }
          </div>
          {/* Reply BBCode Editor */}
          {
            !isClosed && user && (
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
          <Section
            title="小组信息"
          >
            <div className={styles.groupInfo}>
              <Avatar src={group.icon} size="medium" />
              <div className={styles.groupDetails}>
                <Link to={`/group/${group.name}`}>{group.title}</Link>
                <div>{`${group.total_members} 名成员`}</div>
              </div>
            </div>
            <ClampableContent
              threshold={CLAMP_HEIGHT_THRESHOLD}
              content={renderBBCode(group.description)}
              className={styles.groupDescription}
              isClamped
            />
            <div className={styles.groupOpinions}>
              <Button type="text"><Link to={`/group/${group.name}`}>小组概览</Link></Button>
              <Button type="text"><Link to={getGroupForumPage(group.name)} isExternal>组内讨论</Link></Button>
              <Button type="text"><Link to={`/group/${group.name}/members`}>小组成员</Link></Button>
            </div>
          </Section>
        </div>
      </div>
    </GlobalLayout>
  )
}
export default TopicPage
