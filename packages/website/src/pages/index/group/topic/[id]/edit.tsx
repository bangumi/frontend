import React from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@bangumi/design';
import useGroupTopic from '@bangumi/website/hooks/use-group-topic';

import TopicForm from '../../components/TopicForm';
import styles from './edit.module.less';

const EditTopicPage = () => {
  const { id } = useParams();
  if (!id || Number.isNaN(Number(id))) {
    throw new Error('BUG: topic id is required');
  }

  const { data } = useGroupTopic(Number(id));

  return (
    <>
      <Typography.Text type='secondary' className={styles.tipText}>
        修改主题
        <Typography.Link
          to={`/group/topic/${data.id}`}
          fontWeight='bold'
          className={styles.topicLink}
        >
          {data.title}
        </Typography.Link>
      </Typography.Text>
      <div className={styles.form}>
        <TopicForm topic={data} />
      </div>
      {/* TODO: add right column */}
    </>
  );
};

export default EditTopicPage;
