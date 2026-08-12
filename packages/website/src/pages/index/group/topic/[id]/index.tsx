import type { FC } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

import { groupTopicApi } from '@bangumi/design/components/Topic/topic-api';
import TopicPage from '@bangumi/website/components/TopicPage';
import useGroupTopic from '@bangumi/website/hooks/use-group-topic';

import GroupInfo from '../../components/GroupInfo';
import GroupTopicHeader from './components/GroupTopicHeader';

const GroupTopicPage: FC = () => {
  const { id } = useParams();
  if (!id || Number.isNaN(Number(id))) {
    throw new Error('BUG: topic id is required');
  }

  const { data: topic, mutate } = useGroupTopic(Number(id));

  return (
    <TopicPage
      topic={topic}
      mutate={mutate}
      api={groupTopicApi}
      header={<GroupTopicHeader title={topic.title} group={topic.group} />}
      sideContent={<GroupInfo group={topic.group} />}
    />
  );
};

export default GroupTopicPage;
