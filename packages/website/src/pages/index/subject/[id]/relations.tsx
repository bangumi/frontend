import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import { useSubjectHome } from '@bangumi/website/hooks/use-subject-home';
import { useSubjectRelations } from '@bangumi/website/hooks/use-subject-relations';

import SubjectRelations from './components/SubjectRelations';

function SubjectRelationsPage() {
  const { id } = useParams();
  const subjectID = Number(id);
  const { data } = useSubjectHome(subjectID);
  const relations = useSubjectRelations(subjectID);

  if (!data || !relations) {
    return null;
  }

  return (
    <>
      <Helmet title={`${data.subject.nameCN || data.subject.name} - 关联`} />
      <SubjectRelations subject={data.subject} relations={relations} />
    </>
  );
}

export default withErrorBoundary(SubjectRelationsPage, {
  404: () => <div>没有找到条目</div>,
});
