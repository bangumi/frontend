import type { FC } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

import TopicPage from '@bangumi/website/components/TopicPage.tsx';
import useSubjectTopic from '@bangumi/website/hooks/use-subject-topic.ts';
import SubjectSummaryCard from '@bangumi/website/pages/index/subject/[id]/components/SubjectSummaryCard.tsx';
import { subjectTopicApi } from '@bangumi/website/pages/index/subject/topic/topic-api.ts';

import SubjectTopicHeader from './components/SubjectTopicHeader.tsx';

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
