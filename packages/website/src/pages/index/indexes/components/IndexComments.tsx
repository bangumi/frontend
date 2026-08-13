import dayjs from 'dayjs';
import React, { useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { CommentBase } from '@bangumi/client/client';
import { State } from '@bangumi/client/topic';
import { Avatar, Button, EditorForm, RichContent, toast, Typography } from '@bangumi/design';
import ReplyForm from '@bangumi/design/components/Topic/ReplyForm';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';
import type { IndexComment } from '@bangumi/website/hooks/use-index-comments';
import { useUser } from '@bangumi/website/hooks/use-user';

import { indexCommentApi } from './index-comment-api';

const { Link } = Typography;

const commentList = css({
  margin: '0',
  padding: '0',
  listStyle: 'none',
});

const commentItem = css({
  padding: '10px 0',
  borderTop: '1px dotted #e8e3e3',
  '&:first-child': { borderTop: 'none' },
});

const commentHeader = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
});

const commentBody = css({
  flex: '1 1 auto',
  minWidth: '0',
});

const meta = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '6px',
  color: '#9f9b9b',
  fontSize: '13px',
  '& a': { color: '#123' },
});

const content = css({
  margin: '4px 0 0',
  fontSize: '14px',
  lineHeight: '150%',
  overflowWrap: 'anywhere',
});

const deleted = css({
  margin: '4px 0 0',
  color: '#9f9b9b',
  fontSize: '13px',
});

const actions = css({
  display: 'flex',
  gap: '6px',
  marginTop: '6px',
});

const replies = css({
  margin: '0 0 0 60px',
  padding: '0',
  listStyle: 'none',
  '@media (max-width: 640px)': { marginLeft: '30px' },
});

const empty = css({
  margin: '0',
  padding: '16px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px dotted #e8e3e3',
  color: '#9f9b9b',
  fontSize: '13px',
});

const topForm = css({
  marginBottom: '10px',
});

function formatTime(unix: number): string {
  return dayjs.unix(unix).format('YYYY-M-D HH:mm');
}

interface CommentNodeProps {
  comment: CommentBase & { replies?: CommentBase[] };
  indexId: number;
  floor: string;
  mutate: () => Promise<unknown>;
}

const CommentNode: React.FC<CommentNodeProps> = ({ comment, indexId, floor, mutate }) => {
  const { user } = useUser();
  const isAuthor = user?.id === comment.creatorID;
  const isDeleted = comment.state !== State.Normal;
  const [showReply, setShowReply] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const handleDelete = async () => {
    if (confirm('确认删除这条评论？')) {
      const res = await ozaClient.deleteIndexComment(comment.id);
      if (res.status === 200) {
        await mutate();
      } else {
        toast(res.data.message);
      }
    }
  };

  const handleEdit = async () => {
    const res = await ozaClient.updateIndexComment(comment.id, { content: editContent });
    if (res.status === 200) {
      setEditing(false);
      await mutate();
    } else {
      toast(res.data.message);
    }
  };

  return (
    <li className={commentItem}>
      <div className={commentHeader}>
        <Avatar src={comment.user?.avatar.small ?? ''} size='small' />
        <div className={commentBody}>
          <div className={meta}>
            {comment.user && (
              <Link to={getUserProfileLink(comment.user.username)}>{comment.user.nickname}</Link>
            )}
            <span>#{floor}</span>
            <span>{formatTime(comment.createdAt)}</span>
          </div>
          {isDeleted ? (
            <p className={deleted}>内容已被删除</p>
          ) : editing ? (
            <EditorForm
              hideCancel={false}
              value={editContent}
              onChange={setEditContent}
              onConfirm={handleEdit}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <RichContent bbcode={comment.content} classname={content} />
          )}
          {user && !isDeleted && !editing && (
            <div className={actions}>
              <Button type='plain' size='small' onClick={() => setShowReply((v) => !v)}>
                回复
              </Button>
              {isAuthor && (
                <Button
                  type='plain'
                  size='small'
                  onClick={() => {
                    setEditContent(comment.content);
                    setEditing(true);
                  }}
                >
                  编辑
                </Button>
              )}
              {isAuthor && (
                <Button type='plain' size='small' onClick={handleDelete}>
                  删除
                </Button>
              )}
            </div>
          )}
          {showReply && (
            <div className={actions}>
              <ReplyForm
                autoFocus
                topicId={indexId}
                replyTo={comment.id}
                api={indexCommentApi}
                placeholder={`回复 @${comment.user?.nickname ?? ''}：`}
                onSuccess={async () => {
                  setShowReply(false);
                  await mutate();
                }}
                onCancel={() => setShowReply(false)}
              />
            </div>
          )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <ul className={replies}>
          {comment.replies.map((reply, idx) => (
            <CommentNode
              key={reply.id}
              comment={reply}
              indexId={indexId}
              floor={`${floor}-${idx + 1}`}
              mutate={mutate}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

/** 目录评论：楼层 + 楼中楼，顶部发帖表单 */
const IndexComments: React.FC<{
  comments: IndexComment[];
  indexId: number;
  mutate: () => Promise<unknown>;
}> = ({ comments, indexId, mutate }) => {
  const { user } = useUser();

  return (
    <>
      {user && (
        <div className={topForm}>
          <ReplyForm
            topicId={indexId}
            api={indexCommentApi}
            placeholder='添加评论…'
            onSuccess={async () => mutate()}
          />
        </div>
      )}
      {comments.length === 0 && <p className={empty}>还没有评论</p>}
      <ul className={commentList}>
        {comments.map((comment, idx) => (
          <CommentNode
            key={comment.id}
            comment={comment}
            indexId={indexId}
            floor={String(idx + 1)}
            mutate={mutate}
          />
        ))}
      </ul>
    </>
  );
};

export default IndexComments;
