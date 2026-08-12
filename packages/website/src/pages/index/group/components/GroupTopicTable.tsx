import dayjs from 'dayjs';
import React from 'react';

import type { GroupTopic } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';

const topicTable = css({
  width: '100%',
  color: '#9f9b9b',
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

const group = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '110px',
});

const author = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '80px',
  smDown: { display: 'none' },
});

const replies = css({
  width: '40px',
});

const updateTime = css({
  width: '90px',
  textAlign: 'right',
  smDown: { display: 'none' },
});

/** 跨小组的话题表（频道首页/随便看看/我的话题），比组内 TopicsTable 多一列小组 */
const GroupTopicTable: React.FC<{ topics: GroupTopic[] }> = ({ topics }) => {
  return (
    <table className={topicTable}>
      <thead>
        <tr>
          <th className={title}>标题</th>
          <th className={group}>小组</th>
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
              <td className={group} title={topic.group.title}>
                <Typography.Link to={`/group/${topic.group.name}`} fontWeight='bold'>
                  {topic.group.title}
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

export default GroupTopicTable;
