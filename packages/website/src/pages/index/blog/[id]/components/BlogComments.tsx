import type { FC } from 'react';
import React, { useState } from 'react';

import { ozaClient } from '@bangumi/client';
import { Avatar, toast } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import type { BlogComment } from '@bangumi/website/hooks/use-blog';
import { useUser } from '@bangumi/website/hooks/use-user';

import BlogCommentItem from './BlogCommentItem';
import BlogReplyForm from './BlogReplyForm';

const commentList = css({
  borderTop: '1px solid #e8e3e3',
});

const empty = css({
  margin: '0',
  padding: '16px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px dotted #e8e3e3',
  color: '#9f9b9b',
  fontSize: '13px',
});

const replyFormContainer = css({
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '20px',
});

const replyForm = css({
  flexBasis: '75%',
  marginLeft: '10px',
  '@media (max-width: 768px)': {
    flexBasis: '100%',
  },
});

interface BlogCommentsProps {
  entryId: number;
  comments: BlogComment[];
  /** 刷新评论列表 */
  onCommentUpdate: () => Promise<unknown>;
}

const BlogComments: FC<BlogCommentsProps> = ({ entryId, comments, onCommentUpdate }) => {
  const { user } = useUser();
  const [replyContent, setReplyContent] = useState('');

  const handleDelete = async (id: number) => {
    if (confirm('确认删除这条评论？')) {
      const response = await ozaClient.deleteBlogComment(id);
      if (response.status === 200) {
        await onCommentUpdate();
      } else {
        toast(response.data.message, { type: 'error' });
      }
    }
  };

  const handleReplySuccess = async (id: number) => {
    // 刷新评论列表
    await onCommentUpdate();
    setReplyContent('');
  };

  return (
    <div>
      <div className={commentList}>
        {comments.length === 0 && <p className={empty}>还没有吐槽</p>}
        {comments.map((comment, idx) => (
          <BlogCommentItem
            key={comment.id}
            entryId={entryId}
            comment={comment}
            floor={idx + 1}
            user={user}
            onDelete={handleDelete}
            onCommentUpdate={onCommentUpdate}
          />
        ))}
      </div>
      {user && (
        <div className={replyFormContainer} id='replyForm'>
          <Avatar src={user.avatar.large} size='small' />
          <BlogReplyForm
            entryId={entryId}
            className={replyForm}
            content={replyContent}
            onChange={setReplyContent}
            onSuccess={handleReplySuccess}
            hideCancel
          />
        </div>
      )}
    </div>
  );
};

export default BlogComments;
