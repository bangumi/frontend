import React from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import useGroupTopic from '@bangumi/website/hooks/use-group-topic.ts';
import TopicForm from '@bangumi/website/pages/index/group/components/TopicForm.tsx';

const form = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const tipText = css({
  display: 'block',
  marginBottom: '10px',
});

const topicLink = css({
  padding: '0 10px',
});

const EditTopicPage = () => {
  const { id } = useParams();
  if (!id || Number.isNaN(Number(id))) {
    throw new Error('BUG: topic id is required');
  }

  const { data, mutate } = useGroupTopic(Number(id));

  return (
    <>
      <Helmet title={`修改主题“${data.title}”`} />
      <Typography.Text type='secondary' className={tipText}>
        修改主题
        <Typography.Link to={`/group/topic/${data.id}`} fontWeight='bold' className={topicLink}>
          {data.title}
        </Typography.Link>
      </Typography.Text>
      <div className={form}>
        <TopicForm topic={{ data, mutate }} />
      </div>
      {/* TODO: add right column */}
    </>
  );
};

export default EditTopicPage;
