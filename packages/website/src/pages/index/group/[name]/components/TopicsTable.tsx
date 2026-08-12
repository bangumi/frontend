import dayjs from 'dayjs';
import React from 'react';

import type { Topic } from '@bangumi/client/topic';
import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';

import { topicListLink } from '../../components/topicListLink';

const topicTable = css({
  width: '100%',
  color: '#777',
  fontSize: '13px',
  tableLayout: 'fixed',
  '& th, & td': {
    padding: '11px 4px',
  },
  '& tr': {
    borderBottom: '1px dotted #e8e3e3',
  },
  '& thead': {
    textAlign: 'left',
    '& th': {
      fontWeight: 'normal',
    },
  },
});

const title = css({
  overflowWrap: 'anywhere',
});

const author = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '90px',
});

const replies = css({
  width: '30px',
  textAlign: 'right',
});

const updateTime = css({
  width: '90px',
  textAlign: 'right',
});

const TopicsTable: React.FC<{ topics: Topic[] }> = ({ topics }) => {
  return (
    <table className={topicTable}>
      <thead>
        <tr>
          <th className={title}>标题</th>
          <th className={author}>作者</th>
          <th className={replies}>回复</th>
          <th className={updateTime}>最后回复于</th>
        </tr>
      </thead>
      <tbody>
        {topics.map((topic) => {
          return (
            <tr key={topic.id}>
              <td className={title} title={topic.title}>
                <Typography.Link to={`/group/topic/${topic.id}`} noStyle className={topicListLink}>
                  {topic.title}
                </Typography.Link>
              </td>
              <td className={author} title={topic.creator?.nickname}>
                <Typography.Link
                  to={getUserProfileLink(topic.creator?.username ?? '')}
                  noStyle
                  className={topicListLink}
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
