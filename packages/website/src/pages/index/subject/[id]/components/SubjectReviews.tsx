import dayjs from 'dayjs';
import React from 'react';

import type { Subject, SubjectReview } from '@bangumi/client/client';
import { Pagination, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getBlogLink, getLegacyPageLink, getUserProfileLink } from '@bangumi/utils/pages';
import PageContainer from '@bangumi/website/components/PageContainer';
import { useUser } from '@bangumi/website/hooks/use-user';

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

const reviewsMain = css({ minWidth: '0' });

/** 我来评论，对齐 PHP btnPink */
const newReviewButton = css({
  boxSizing: 'border-box',
  display: 'inline-block',
  margin: '5px 0',
  padding: '5px 25px',
  borderRadius: '50px',
  background: '#f09199',
  color: '#fff',
  fontSize: '14px',
  lineHeight: '150%',
  textAlign: 'center',
  _hover: { background: '#e7848e', color: '#fff', textDecoration: 'none' },
});

/** 分隔线，对齐 PHP hr.board */
const boardHr = css({
  height: '1px',
  margin: '10px 0',
  border: '0',
  background: '#e0dcdc',
});

/** 评论（日志）列表，对齐 PHP block_entry_list */
const entryList = css({
  margin: '0',
  padding: '0',
  listStyle: 'none',
});

const entryItem = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '15px 10px',
  borderBottom: '1px solid #e8e3e3',
  boxSizing: 'border-box',
});

const entryBody = css({ flex: '1 1 auto', minWidth: '0' });

const entryTitle = css({
  margin: '0 0 5px',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '140%',
  '& a': {
    color: '#1f1c1c',
  },
});

const entrySummary = css({
  margin: '0 0 5px',
  fontSize: '14px',
  lineHeight: '170%',
  color: '#9f9b9b',
  overflowWrap: 'anywhere',
  '& a': {
    display: 'block',
    color: '#9f9b9b',
  },
});

const entryMeta = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '5px',
  margin: '5px 0 0',
  fontSize: '13px',
  color: '#9f9b9b',
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

const SubjectReviews: React.FC<{
  subject: Subject;
  reviews: SubjectReview[];
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}> = ({ subject, reviews, total, currentPage, pageSize, onPageChange }) => {
  const { user } = useUser();

  return (
    <>
      <SubjectHeader subject={subject} />
      <PageContainer as='main'>
        <div className={columns}>
          <div className={reviewsMain}>
            {user != null && (
              <a
                className={newReviewButton}
                href={getLegacyPageLink(`/blog/create?review=${subject.id}`)}
                title='我来评论'
              >
                我来评论
              </a>
            )}
            <hr className={boardHr} />
            {reviews.length === 0 && <p className={empty}>暂无评论</p>}
            {reviews.length > 0 && (
              <ul className={entryList}>
                {reviews.map((review) => (
                  <li key={review.id} className={entryItem}>
                    <div className={entryBody}>
                      <h2 className={entryTitle}>
                        <Link to={getBlogLink(review.entry.id)} title={review.entry.title}>
                          {review.entry.title}
                        </Link>
                      </h2>
                      <p className={entrySummary}>
                        <Link to={getBlogLink(review.entry.id)}>{review.entry.summary}</Link>
                      </p>
                      <div className={entryMeta}>
                        <Link to={getUserProfileLink(review.user.username)}>
                          {review.user.nickname}
                        </Link>
                        <span>·</span>
                        <span>评论 {subject.name}</span>
                        <span>·</span>
                        <span>{dayjs.unix(review.entry.createdAt).format('YYYY-M-D')}</span>
                        <span>·</span>
                        <Link to={getBlogLink(review.entry.id)}>{review.entry.replies} 回复</Link>
                      </div>
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

export default SubjectReviews;
