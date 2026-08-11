import dayjs from 'dayjs';
import React from 'react';

import type { Topic } from '@bangumi/client/topic';
import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';

const topicTable = css({
  width: '100%',
  color: '#9f9b9b',
  tableLayout: 'fixed',
  '& th, & td': {
    padding: '11px 4px',
  },
  '& tr': {
    borderBottom: '1px dotted #e8e3e3',
  },
  '& thead': {
    fontSize: '18px',
    lineHeight: '18px',
    textAlign: 'left',
    '& th': {
      fontWeight: 'normal',
    },
  },
});

const title = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const author = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '120px',
});

const replies = css({
  width: '60px',
});

const updateTime = css({
  width: '100px',
  textAlign: 'right',
});

const TopicsTable: React.FC<{ topics: Topic[] }> = ({ topics }) => {
  return (
    <table className={topicTable}>
      <thead>
        <tr>
          <th className={title}>标题</th>
          <th className={author}>作者</th>
          <th className={replies}>回复数</th>
          <th className={updateTime}>最后回复于</th>
        </tr>
      </thead>
      <tbody>
        {topics.map((topic) => {
          return (
            <tr key={topic.id}>
              <td className={title} title={topic.title}>
                <Typography.Link to={`/group/topic/${topic.id}`} fontWeight='bold'>
                  {topic.title}
                </Typography.Link>
              </td>
              <td className={author} title={topic.creator?.nickname}>
                <Typography.Link
                  to={getUserProfileLink(topic.creator?.username ?? '')}
                  fontWeight='bold'
                >
                  {topic.creator?.nickname}
                </Typography.Link>
              </td>
              <td className={replies}>{topic.replyCount}</td>
              <td className={updateTime}>{dayjs(topic.updatedAt * 1000).format('YYYY-M-D')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TopicsTable;
