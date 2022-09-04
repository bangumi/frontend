import React, { FC, useState } from 'react'
import { Reply, Comment } from '../../../../../types/common'
import { Avatar, RichContent, Typography, Button, EditorForm } from '@bangumi/design'
import { render as renderBBCode } from '@bangumi/utils'
import styles from './TopicComment.module.less'
import ReplyInfo from './ReplyInfo'
import { Friend, OriginalPoster, TopicClosed, TopicSilent } from '@bangumi/icons'
import classNames from 'classnames'
import { useUser } from '../../../../../hooks/use-user'

type TopicCommentProps =
  ((Reply & { isReply: true }) | (Comment & { isReply: false }))
  & {
    floor: string | number
    originalPosterId: number
  }

const Link = Typography.Link

const RenderContent: FC<{ state: number, text: string }> = (
  {
    state,
    text
  }
) => {
  switch (state) {
    case 0:
      return <RichContent html={renderBBCode(text)} classname={styles.topicContent} />
    case 1:
      return <div className={styles.topicContent}>关闭了该主题</div>
    case 2:
      return <div className={styles.topicContent}>重新开启了该主题</div>
    case 5:
      return <div className={styles.topicContent}>下沉了该主题</div>
    case 6:
      return <div className={styles.deletedContent}>内容已被用户删除</div>
    case 7:
      return (
        <div className={styles.deletedContent}>内容因违反「<Link to="https://bgm.tv/about/guideline" isExternal>社区指导原则</Link>」已被删除
        </div>
      )
    default:
      return null
  }
}

const TopicComment: FC<TopicCommentProps> = ({
  text,
  creator,
  created_at: createAt,
  floor,
  is_friend: isFriend,
  originalPosterId,
  state,
  ...props
}) => {
  const isReply = props.isReply
  const isDeleted = state === 6 || state === 7
  // 1 关闭 2 重开 5 下沉
  const isSpecial = state === 1 || state === 2 || state === 5
  const replies = !isReply ? props.replies : null
  const [shouldCollapsed, setShouldCollapsed] = useState(isReply && ((/[+-]\d+$/.test(text) || isDeleted)))
  const [showReplyEditor, setShowReplyEditor] = useState(false)
  const { user } = useUser()

  const headerClassName = classNames(styles.commentHeader, {
    [styles.replyHeader]: isReply,
    [styles.commentCollapsed]: shouldCollapsed || isSpecial
  })

  if (shouldCollapsed) {
    return (
      <div className={headerClassName} onClick={() => setShouldCollapsed(false)}>
        <span className={styles.navBar}>
          <div className={styles.creatorInfo}>
            <Link to={creator.url} isExternal>{creator.nickname}</Link>
            <RenderContent state={state} text={text} />
          </div>
          <ReplyInfo createdAt={createAt} floor={floor} />
        </span>
      </div>
    )
  }

  if (isSpecial) {
    let icon = null
    switch (state) {
      case 1:
        icon = <TopicClosed />
        break
      case 2:
        icon = null
        break
      case 5:
        icon = <TopicSilent />
        break
    }
    return (
      <div className={headerClassName}>
        <span className={styles.navBar}>
          <div className={styles.creatorInfo}>
            {
              icon
            }
            <Link to={creator.url} isExternal>{creator.nickname}</Link>
            <RenderContent state={state} text={text} />
          </div>
          <ReplyInfo createdAt={createAt} floor={floor} isSpecial />
        </span>
      </div>
    )
  }

  return (
    <div>
      <div className={headerClassName}>
        <Avatar src={creator.avatar.large} size={isReply ? 'small' : 'medium'} />
        <div className={styles.commentBox}>
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
                  // Todo: XSS ?
                  creator.sign
                    ? <span className={styles.sign} dangerouslySetInnerHTML={{ __html: `// ${creator.sign}` }} />
                    : null
                }
              </div>
              <ReplyInfo createdAt={createAt} floor={floor} />
            </span>
            <RenderContent state={state} text={text} />
          </div>
          <div className={styles.optionBox}>
            {
              showReplyEditor
                ? (
                  <EditorForm
                    onCancel={() => setShowReplyEditor(false)}
                    placeholder={`回复给 @${creator.nickname}：`}
                  />
                  )
                : (
                  <>
                    <Button type="secondary" shape="rounded" onClick={() => setShowReplyEditor(true)}>回复</Button>
                    <Button type="secondary" shape="rounded">+1</Button>
                    {
                      user?.id === creator.id
                        ? (
                          <>
                            <Button type="text">编辑</Button>
                            <Button type="text">删除</Button>
                          </>
                          )
                        : null
                    }
                  </>
                  )
            }
          </div>
        </div>
      </div>
      {
        replies?.map((reply, idx) => (
          <TopicComment
            key={reply.id}
            isReply
            floor={`${floor}-${idx + 1}`}
            originalPosterId={originalPosterId}
            {...reply}
          />
        ))
      }
    </div>
  )
}

export default TopicComment
