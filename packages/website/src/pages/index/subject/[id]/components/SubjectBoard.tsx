import dayjs from 'dayjs';
import React from 'react';

import type { Subject, Topic } from '@bangumi/client/client';
import { Pagination, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getLegacyPageLink, getSubjectTopicLink, getUserProfileLink } from '@bangumi/utils/pages';
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

const boardMain = css({ minWidth: '0' });

/** 添加新讨论，对齐 PHP btnPink */
const newTopicButton = css({
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

/** 主题列表，对齐 PHP table.topic_list */
const topicTable = css({
  width: '100%',
  marginBottom: '23px',
  borderCollapse: 'collapse',
  fontSize: '13px',
  '& tr': { borderBottom: '1px dotted #e8e3e3' },
  '& tr.even': { background: '#f9f9f9' },
  '& td': { padding: '8px 4px' },
});

const topicSubject = css({
  padding: '8px 5px 8px 0',
  textAlign: 'left',
  '& a': {
    color: '#595555',
    fontWeight: 'normal',
  },
});

const topicAuthor = css({
  width: '120px',
  padding: '0 5px 0 0',
  color: '#595555',
});

const topicReplies = css({
  width: '40px',
  padding: '0 0 0 5px',
  color: '#888',
  fontSize: '10px',
  textAlign: 'right',
  whiteSpace: 'nowrap',
});

const topicTime = css({
  width: '90px',
  padding: '0 5px 0 10px',
  color: '#9f9b9b',
  fontSize: '12px',
  textAlign: 'right',
  whiteSpace: 'nowrap',
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

const SubjectBoard: React.FC<{
  subject: Subject;
  topics: Topic[];
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}> = ({ subject, topics, total, currentPage, pageSize, onPageChange }) => {
  const { user } = useUser();

  return (
    <>
      <SubjectHeader subject={subject} />
      <PageContainer as='main'>
        <div className={columns}>
          <div className={boardMain}>
            {user != null && (
              <a
                className={newTopicButton}
                href={getLegacyPageLink(`/subject/${subject.id}/topic/new`)}
                title='添加新讨论'
              >
                添加新讨论
              </a>
            )}
            <hr className={boardHr} />
            {topics.length === 0 && <p className={empty}>暂无讨论</p>}
            {topics.length > 0 && (
              <table className={topicTable}>
                <tbody>
                  {topics.map((topic, index) => (
                    <tr key={topic.id} className={index % 2 === 0 ? 'odd' : 'even'}>
                      <td className={topicSubject}>
                        <Link to={getSubjectTopicLink(topic.id)} title={topic.title}>
                          {topic.title}
                        </Link>
                      </td>
                      <td className={topicAuthor}>
                        <Link
                          variant='subtle'
                          to={getUserProfileLink(topic.creator?.username ?? '')}
                          title={topic.creator?.nickname}
                        >
                          {topic.creator?.nickname}
                        </Link>
                      </td>
                      <td className={topicReplies}>{topic.replyCount} replies</td>
                      <td className={topicTime}>
                        {dayjs.unix(topic.createdAt).format('YYYY-M-D')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default SubjectBoard;
