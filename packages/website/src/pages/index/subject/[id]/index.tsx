import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import { useSubjectHome } from '@bangumi/website/hooks/use-subject-home';

import SubjectDetail from './components/SubjectDetail';

function SubjectPage() {
  const { id } = useParams();
  const subjectID = Number(id);
  const { data } = useSubjectHome(subjectID);

  if (!data) {
    return null;
  }

  return <SubjectDetail data={data} />;
}

export default withErrorBoundary(SubjectPage, {
  404: () => <div>没有找到条目</div>,
});
