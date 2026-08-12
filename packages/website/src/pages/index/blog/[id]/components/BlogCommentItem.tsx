import type { FC } from 'react';
import React, { memo, useState } from 'react';

import type { CommentBase, SlimUser } from '@bangumi/client/client';
import { Avatar, Typography } from '@bangumi/design';
import RichContent from '@bangumi/design/components/RichContent';
import { css, cx } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';

import { makeDescriptiveTime } from '../../../subject/[id]/components/subject-common';
import BlogReplyForm from './BlogReplyForm';

const { Link } = Typography;

const commentTip = css({
  overflowWrap: 'anywhere',
  '& .creator-info, & .comment-info': {
    minWidth: '0',
  },
  '& .comment-info': {
    flexWrap: 'wrap',
  },
});

const commentBody = css({
  overflowWrap: 'anywhere',
  minWidth: '0',
  '& > *': {
    maxWidth: '100%',
  },
});

const commentHeader = css({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '15px 15px 10px',
  borderBottom: '1px dotted #e8e3e3',
  '&.blog-comment__header--reply': {
    marginLeft: '70px',
    '& .blog-comment__box': { marginLeft: '13px' },
  },
  '@media (max-width: 640px)': {
    padding: '10px 5px',
    '& .blog-comment__box': { marginLeft: '10px' },
    '&.blog-comment__header--reply': {
      marginLeft: '55px',
      '& .blog-comment__box': { marginLeft: '13px' },
    },
  },
  '& .blog-comment__box': {
    marginLeft: '15px',
    flex: '1',
    // this trick is same to EditorForm
    minWidth: '0',
  },
  '& .blog-comment__main': {
    minHeight: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  '& .blog-comment__tip': {
    fontSize: '16px',
    lineHeight: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#9f9b9b',
    width: '100%',
    '& .creator-info': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& .bgm-link, & svg': { paddingRight: '12px' },
    },
    '& .comment-info': {
      display: 'flex',
      fontSize: '14px',
      lineHeight: '20px',
      gap: '8px',
    },
  },
  '& .blog-comment__content': {
    color: '#1f1c1c',
    lineHeight: '26px',
    marginTop: '12px',
  },
  '& .blog-comment__content--deleted': {
    color: '#595555',
  },
});

const commentActions = css({
  display: 'inline-flex',
  gap: '12px',
  '& button': {
    padding: '0',
    border: 'none',
    background: 'none',
    color: '#9f9b9b',
    fontSize: '14px',
    lineHeight: '20px',
    cursor: 'pointer',
    '&:hover': {
      color: '#0084b4',
    },
  },
});

const replyEditor = css({
  marginTop: '12px',
});

interface BlogCommentItemProps {
  entryId: number;
  /** 顶层评论携带子回复列表 */
  comment: CommentBase & { replies?: CommentBase[] };
  floor: string | number;
  user?: Pick<SlimUser, 'id'>;
  /** 删除评论的回调，调用方负责刷新评论列表 */
  onDelete: (id: number) => void;
  onCommentUpdate: () => Promise<unknown>;
  /** 是否为子回复 */
  isReply?: boolean;
}

const BlogCommentItem: FC<BlogCommentItemProps> = ({
  entryId,
  comment,
  floor,
  user,
  onDelete,
  onCommentUpdate,
  isReply = false,
}) => {
  const isDeleted = comment.state === 6 || comment.state === 7;
  const isAuthor = user?.id === comment.creatorID;
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySuccess = async (id: number) => {
    // 先隐藏回复框避免 scrollIntoView 后布局变化
    setShowReplyEditor(false);
    // 刷新评论列表
    await onCommentUpdate();
  };

  const replies = 'replies' in comment ? comment.replies : undefined;

  return (
    <div>
      <div
        className={cx(commentHeader, isReply && 'blog-comment__header--reply')}
        id={`post_${comment.id}`}
      >
        <Avatar src={comment.user?.avatar.medium ?? ''} size={isReply ? 'xsmall' : 'small'} />
        <div className={cx('blog-comment__box', commentBody)}>
          <div className='blog-comment__main'>
            <span className={cx('blog-comment__tip', commentTip)}>
              <div className='creator-info'>
                <Link to={getUserProfileLink(comment.user?.username ?? '')}>
                  {comment.user?.nickname ?? ''}
                </Link>
              </div>
              <div className='comment-info'>
                <span>#{floor}</span>
                <span>-</span>
                <span>{makeDescriptiveTime(comment.createdAt)}</span>
                {!isDeleted && (
                  <span className={commentActions}>
                    <button type='button' onClick={() => setShowReplyEditor((v) => !v)}>
                      回复
                    </button>
                    {isAuthor && (
                      <button type='button' onClick={() => onDelete(comment.id)}>
                        删除
                      </button>
                    )}
                  </span>
                )}
              </div>
            </span>
            {isDeleted ? (
              <div className='blog-comment__content--deleted'>内容已被删除</div>
            ) : (
              <RichContent bbcode={comment.content} classname='blog-comment__content' />
            )}
            {showReplyEditor && (
              <div className={replyEditor}>
                <BlogReplyForm
                  autoFocus
                  entryId={entryId}
                  replyTo={comment.id}
                  placeholder={`回复 @${comment.user?.nickname ?? ''}：`}
                  content={replyContent}
                  onChange={setReplyContent}
                  onCancel={() => setShowReplyEditor(false)}
                  onSuccess={handleReplySuccess}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {replies?.map((reply, idx) => (
        <BlogCommentItem
          key={reply.id}
          entryId={entryId}
          comment={reply}
          floor={`${floor}-${idx + 1}`}
          user={user}
          onDelete={onDelete}
          onCommentUpdate={onCommentUpdate}
          isReply
        />
      ))}
    </div>
  );
};

export default memo(BlogCommentItem);
