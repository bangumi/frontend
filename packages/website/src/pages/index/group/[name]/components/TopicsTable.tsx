import dayjs from 'dayjs';
import React from 'react';

import type { Topic } from '@bangumi/client/common';
import { Typography } from '@bangumi/design';
import { getUserProfileLink } from '@bangumi/utils/pages';

import styles from './TopicsTable.module.less';

const TopicsTable: React.FC<{ topics: Topic[] }> = ({ topics }) => {
  return (
    <table className={styles.topicTable}>
      <thead>
        <tr>
          <th className={styles.title}>标题</th>
          <th className={styles.author}>作者</th>
          <th className={styles.replies}>回复数</th>
          <th className={styles.updateTime}>最后回复于</th>
        </tr>
      </thead>
      <tbody>
        {topics.map((topic) => {
          return (
            <tr key={topic.id}>
              <td className={styles.title} title={topic.title}>
                <Typography.Link to={`/group/topic/${topic.id}`} fontWeight='bold'>
                  {topic.title}
                </Typography.Link>
              </td>
              <td className={styles.author} title={topic.creator.nickname}>
                <Typography.Link
                  to={getUserProfileLink(topic.creator.username)}
                  fontWeight='bold'
                  isExternal
                >
                  {topic.creator.nickname}
                </Typography.Link>
              </td>
              <td className={styles.replies}>{topic.repliesCount}</td>
              <td className={styles.updateTime}>
                {dayjs(topic.updatedAt * 1000).format('YYYY-M-D')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TopicsTable;
