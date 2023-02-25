import React from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@bangumi/design';
import { useGroup } from '@bangumi/website/hooks/use-group';

import GroupInfo from '../../components/GroupInfo';
import TopicForm from '../../components/TopicForm';
import styles from './style.module.less';

const GroupNewTopicPage = () => {
  const { name } = useParams();
  const { group } = useGroup(name!);

  return (
    <>
      <Typography.Text type='secondary' className={styles.tipText}>
        在
        <Typography.Link
          to={`/group/${group.group.name}`}
          fontWeight='bold'
          className={styles.groupLink}
        >
          {group.group.title}
        </Typography.Link>
        发表新话题
      </Typography.Text>
      <div className={styles.grid}>
        <TopicForm groupName={name} />
        <div className={styles.rightColumn}>
          <GroupInfo group={group.group} />
        </div>
      </div>
    </>
  );
};

export default GroupNewTopicPage;
