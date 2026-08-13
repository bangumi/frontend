import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { ozaClient } from '@bangumi/client';
import type { CollectionType, Subject, SubjectInterestComment } from '@bangumi/client/client';
import {
  Button,
  EditorForm,
  Pagination,
  Radio,
  Rate,
  Select,
  Tab,
  toast,
  Typography,
} from '@bangumi/design';
import Reactions from '@bangumi/design/components/Topic/Reactions';
import { css } from '@bangumi/styled-system/css';
import { getSubjectCommentsLink, getUserProfileLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';
import TurnstileCaptcha from '@bangumi/website/components/TurnstileCaptcha';
import { useUser } from '@bangumi/website/hooks/use-user';

import { subjectCommentApi } from './subject-comment-api';
import { COLLECT_DESC, makeDescriptiveTime } from './subject-common';
import { SubjectHeader } from './SubjectDetail';
import SubjectSummaryCard from './SubjectSummaryCard';

const { Link } = Typography;

const columns = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 7fr) minmax(260px, 3fr)',
  alignItems: 'start',
  gap: '20px',
  '@media (max-width: 768px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
});

const commentsMain = css({ minWidth: '0' });

const commentTabs = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px 0',
  margin: '0 0 10px',
});

const commentList = css({
  margin: '0',
  padding: '0',
  listStyle: 'none',
});

const commentItem = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '10px 0',
  borderTop: '1px dotted #e8e3e3',
  boxSizing: 'border-box',
  '&:first-child': { borderTop: 'none' },
});

const commentAvatar = css({
  flex: '0 0 40px',
  width: '40px',
  height: '40px',
  borderRadius: '6px',
});

const commentBody = css({
  flex: '1 1 auto',
  minWidth: '0',
  fontSize: '13px',
  lineHeight: '150%',
});

const commentMeta = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '5px',
  margin: '0 0 4px',
  fontSize: '13px',
  color: '#9f9b9b',
});

const commentText = css({
  margin: '0',
  color: '#595555',
  overflowWrap: 'anywhere',
});

const commentActions = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginTop: '6px',
});

const empty = css({
  margin: '0',
  padding: '16px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px dotted #e8e3e3',
  color: '#9f9b9b',
  fontSize: '13px',
});

const pagination = css({ margin: '10px 0' });

/** 顶部发帖表单区 */
const topForm = css({
  margin: '0 0 10px',
  padding: '12px',
  border: '1px solid #e8e3e3',
  borderRadius: '8px',
});

const topFormRow = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '8px',
  fontSize: '13px',
  color: '#595555',
});

const rateSelect = css({
  padding: '0.25rem 0.5rem',
  fontSize: '0.9rem',
});

const commentsTabsItems = [
  { key: 'all', label: '全部', type: undefined as CollectionType | undefined },
  ...(Object.entries(COLLECT_DESC) as [string, string][]).map(([key, label]) => ({
    key,
    label,
    type: Number(key) as CollectionType,
  })),
];

const RATE_OPTIONS = Array.from({ length: 11 }, (_, i) => ({
  label: i === 0 ? '不评分' : `${i} 分`,
  value: String(i),
}));

/** 吐槽发帖表单：收藏状态（必选）+ 评分（可选）+ 文本 */
const CommentForm: React.FC<{
  subjectID: number;
  mutate: () => Promise<unknown>;
}> = ({ subjectID, mutate }) => {
  const [commentType, setCommentType] = useState<CollectionType | undefined>();
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const submit = async () => {
    if (!comment.trim()) {
      toast('请填写吐槽内容');
      return;
    }
    if (commentType === undefined) {
      toast('请先选择收藏状态（想看/看过/在看/搁置/抛弃）');
      return;
    }
    const res = await ozaClient.createSubjectComment(subjectID, {
      comment,
      type: commentType,
      rate: rate > 0 ? rate : undefined,
      turnstileToken: turnstileToken ?? '',
    });
    if (res.status === 200) {
      setComment('');
      await mutate();
    } else {
      toast(res.data.message);
    }
  };

  return (
    <div className={topForm}>
      <div className={topFormRow}>
        <span>收藏状态：</span>
        <Radio.Group>
          {(Object.entries(COLLECT_DESC) as [string, string][]).map(([key, label]) => (
            <Radio
              key={key}
              label={label}
              name='comment-type'
              checked={commentType === Number(key)}
              onChange={() => setCommentType(Number(key) as CollectionType)}
            />
          ))}
        </Radio.Group>
      </div>
      <div className={topFormRow}>
        <span>评分：</span>
        <Select
          className={rateSelect}
          defaultValue='0'
          options={RATE_OPTIONS}
          onChange={(option) => setRate(option ? Number(option.value) : 0)}
        />
      </div>
      <EditorForm
        placeholder='写点吐槽…'
        hideCancel
        value={comment}
        onChange={setComment}
        onConfirm={submit}
        submitExtra={<TurnstileCaptcha action='post_comment' onToken={setTurnstileToken} />}
      />
    </div>
  );
};

/** 单条吐槽：编辑/删除/点赞 */
const CommentItem: React.FC<{
  comment: SubjectInterestComment;
  mutate: () => Promise<unknown>;
}> = ({ comment, mutate }) => {
  const { user } = useUser();
  const isAuthor = user?.id === comment.user.id;
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.comment);

  const handleDelete = async () => {
    if (confirm('确认删除这条吐槽？')) {
      const res = await ozaClient.deleteSubjectComment(comment.id);
      if (res.status === 200) {
        await mutate();
      } else {
        toast(res.data.message);
      }
    }
  };

  const handleEdit = async () => {
    const res = await ozaClient.updateSubjectComment(comment.id, { comment: editContent });
    if (res.status === 200) {
      setEditing(false);
      await mutate();
    } else {
      toast(res.data.message);
    }
  };

  return (
    <li className={commentItem}>
      <Link to={getUserProfileLink(comment.user.username)}>
        <img
          src={comment.user.avatar.small}
          alt={comment.user.nickname}
          className={commentAvatar}
        />
      </Link>
      <div className={commentBody}>
        <div className={commentMeta}>
          <Link to={getUserProfileLink(comment.user.username)}>{comment.user.nickname}</Link>
          {comment.rate > 0 && <Rate value={comment.rate} />}
          <span>{COLLECT_DESC[comment.type]}</span>
          <span>@{makeDescriptiveTime(comment.updatedAt)}</span>
        </div>
        {editing ? (
          <EditorForm
            value={editContent}
            onChange={setEditContent}
            onConfirm={handleEdit}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <p className={commentText}>{comment.comment}</p>
        )}
        {user && !editing && (
          <div className={commentActions}>
            {isAuthor && (
              <Button
                type='plain'
                size='small'
                onClick={() => {
                  setEditContent(comment.comment);
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
        <Reactions
          reactions={comment.reactions}
          postId={comment.id}
          user={user}
          onReacted={mutate}
          api={subjectCommentApi}
        />
      </div>
    </li>
  );
};

const SubjectComments: React.FC<{
  subject: Subject;
  subjectID: number;
  comments: SubjectInterestComment[];
  total: number;
  currentPage: number;
  pageSize: number;
  type: CollectionType | undefined;
  onPageChange: (page: number) => void;
  mutate: () => Promise<unknown>;
}> = ({
  subject,
  subjectID,
  comments,
  total,
  currentPage,
  pageSize,
  type,
  onPageChange,
  mutate,
}) => {
  const { user } = useUser();

  return (
    <>
      <SubjectHeader subject={subject} />
      <PageContainer as='main'>
        <div className={columns}>
          <div className={commentsMain}>
            <Tab.Group type='borderless'>
              {commentsTabsItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={
                    item.type === undefined
                      ? getSubjectCommentsLink(subject.id)
                      : `${getSubjectCommentsLink(subject.id)}?type=${item.type}`
                  }
                  className={commentTabs}
                >
                  {({ isActive }) => <Tab.Item isActive={isActive}>{item.label}</Tab.Item>}
                </NavLink>
              ))}
            </Tab.Group>
            {user && <CommentForm subjectID={subjectID} mutate={mutate} />}
            {comments.length === 0 && <p className={empty}>还没有吐槽</p>}
            {comments.length > 0 && (
              <ul className={commentList}>
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} mutate={mutate} />
                ))}
              </ul>
            )}
            <Pagination
              total={total}
              currentPage={currentPage}
              pageSize={pageSize}
              onChange={onPageChange}
              wrapperClass={pagination}
            />
          </div>
          <SubjectSummaryCard subject={subject} />
        </div>
      </PageContainer>
    </>
  );
};

export default SubjectComments;
