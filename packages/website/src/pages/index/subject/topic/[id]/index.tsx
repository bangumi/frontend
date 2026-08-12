import type { FC } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

import TopicPage from '@bangumi/website/components/TopicPage';
import useSubjectTopic from '@bangumi/website/hooks/use-subject-topic';

import SubjectSummaryCard from '../../[id]/components/SubjectSummaryCard';
import { subjectTopicApi } from '../topic-api';
import SubjectTopicHeader from './components/SubjectTopicHeader';

const SubjectTopicPage: FC = () => {
  const { id } = useParams();
  if (!id || Number.isNaN(Number(id))) {
    throw new Error('BUG: topic id is required');
  }

  const { data: topic, mutate } = useSubjectTopic(Number(id));

  return (
    <TopicPage
      topic={topic}
      mutate={mutate}
      api={subjectTopicApi}
      header={<SubjectTopicHeader title={topic.title} subject={topic.subject} />}
      sideContent={<SubjectSummaryCard subject={topic.subject} />}
    />
  );
};

export default SubjectTopicPage;
