import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import { useSubjectEpisodes } from '@bangumi/website/hooks/use-subject-episodes';
import { useSubjectHome } from '@bangumi/website/hooks/use-subject-home';

import SubjectEpisodes from './components/SubjectEpisodes';

function SubjectEpisodesPage() {
  const { id } = useParams();
  const subjectID = Number(id);
  const { data } = useSubjectHome(subjectID);
  const episodes = useSubjectEpisodes(subjectID);

  if (!data || !episodes) {
    return null;
  }

  return (
    <>
      <Helmet title={`${data.subject.nameCN || data.subject.name} - 章节`} />
      <SubjectEpisodes subject={data.subject} episodes={episodes} />
    </>
  );
}

export default withErrorBoundary(SubjectEpisodesPage, {
  404: () => <div>没有找到条目</div>,
});
