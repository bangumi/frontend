import React, { FC } from 'react'
import { Reply, Comment } from '../../../../../types/common'
import { Avatar, RichContent, Typography } from '@bangumi/design'
import { render as renderBBCode } from '@bangumi/utils'
import styles from './TopicComment.module.less'
import ReplyInfo from './ReplyInfo'
import { Friend, OriginalPoster } from '@bangumi/icons'

type TopicCommentProps =
  ((Reply & { isReply: true }) | (Comment & { isReply: false }))
  & {
    floor: string | number
    isOriginalPoster: boolean
  }

const Link = Typography.Link

const TopicComment: FC<TopicCommentProps> = ({
  text,
  creator,
  created_at: createAt,
  floor,
  is_friend: isFriend,
  isOriginalPoster
}) => {
  return (
    <div>
      <div className={styles.commentHeader}>
        <Avatar src={creator.avatar.large} size="medium" />
        <div className={styles.commentMain}>
          <span className={styles.navBar}>
            <div className={styles.creatorInfo}>
              <Link to={creator.url} isExternal>{creator.nickname}</Link>
              {
                isOriginalPoster ? <OriginalPoster /> : null
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
          <RichContent html={renderBBCode(text)} />
        </div>
      </div>
    </div>
  )
}

export default TopicComment
