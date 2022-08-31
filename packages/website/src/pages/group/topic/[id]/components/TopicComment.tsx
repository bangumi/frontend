import React, { FC } from 'react'
import { Reply, Comment } from '../../../../../types/common'
import { Avatar, RichContent, Typography } from '@bangumi/design'
import { render as renderBBCode } from '@bangumi/utils'
import styles from './TopicComment.module.less'
import ReplyInfo from './ReplyInfo'
import { Friend, OriginalPoster } from '@bangumi/icons'
import classNames from 'classnames'

type TopicCommentProps =
  ((Reply & { isReply: true }) | (Comment & { isReply: false }))
  & {
    floor: string | number
    originalPosterId: number
  }

const Link = Typography.Link

const TopicComment: FC<TopicCommentProps> = ({
  text,
  creator,
  created_at: createAt,
  floor,
  is_friend: isFriend,
  originalPosterId,
  ...props
}) => {
  const isReply = props.isReply
  const replies = !isReply ? props.replies : null
  const headerClassName = classNames(styles.commentHeader, { [styles.replyHeader]: isReply })
  return (
    <div>
      <div className={headerClassName}>
        <Avatar src={creator.avatar.large} size={isReply ? 'small' : 'medium'} />
        <div className={styles.commentMain}>
          <span className={styles.navBar}>
            <div className={styles.creatorInfo}>
              <Link to={creator.url} isExternal>{creator.nickname}</Link>
              {
                originalPosterId === creator.id ? <OriginalPoster /> : null
              }
              {
                isFriend ? <Friend /> : null
              }
              {
                creator.sign ? <span>{`// ${creator.sign}`}</span> : null
              }
            </div>
            <ReplyInfo createdAt={createAt} floor={floor} />
          </span>
          <RichContent html={renderBBCode(text)} classname={styles.topicContent} />
        </div>
      </div>
      {
        replies?.map((reply, idx) => (
          <TopicComment
            key={reply.id}
            isReply
            floor={idx}
            originalPosterId={originalPosterId}
            {...reply}
          />
        ))
      }
    </div>
  )
}

export default TopicComment
