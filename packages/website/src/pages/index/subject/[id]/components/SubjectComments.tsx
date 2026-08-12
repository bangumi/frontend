import React from 'react';
import { NavLink } from 'react-router-dom';

import type { CollectionType, Subject, SubjectInterestComment } from '@bangumi/client/client';
import { Pagination, Rate, Tab, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getSubjectCommentsLink, getUserProfileLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';

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

const empty = css({
  margin: '0',
  padding: '16px 10px',
  borderTop: '1px solid #e8e3e3',
  borderBottom: '1px dotted #e8e3e3',
  color: '#9f9b9b',
  fontSize: '13px',
});

const pagination = css({ margin: '10px 0' });

const commentsTabsItems = [
  { key: 'all', label: '全部', type: undefined as CollectionType | undefined },
  ...(Object.entries(COLLECT_DESC) as [string, string][]).map(([key, label]) => ({
    key,
    label,
    type: Number(key) as CollectionType,
  })),
];

const SubjectComments: React.FC<{
  subject: Subject;
  comments: SubjectInterestComment[];
  total: number;
  currentPage: number;
  pageSize: number;
  type: CollectionType | undefined;
  onPageChange: (page: number) => void;
}> = ({ subject, comments, total, currentPage, pageSize, type, onPageChange }) => {
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
            {comments.length === 0 && <p className={empty}>还没有吐槽</p>}
            {comments.length > 0 && (
              <ul className={commentList}>
                {comments.map((comment) => (
                  <li key={comment.id} className={commentItem}>
                    <Link to={getUserProfileLink(comment.user.username)}>
                      <img
                        src={comment.user.avatar.small}
                        alt={comment.user.nickname}
                        className={commentAvatar}
                      />
                    </Link>
                    <div className={commentBody}>
                      <div className={commentMeta}>
                        <Link to={getUserProfileLink(comment.user.username)}>
                          {comment.user.nickname}
                        </Link>
                        {comment.rate > 0 && <Rate value={comment.rate} />}
                        <span>{COLLECT_DESC[comment.type]}</span>
                        <span>@{makeDescriptiveTime(comment.updatedAt)}</span>
                      </div>
                      <p className={commentText}>{comment.comment}</p>
                    </div>
                  </li>
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
