import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import { useSubjectHome } from '@bangumi/website/hooks/use-subject-home.ts';
import { useSubjectRelations } from '@bangumi/website/hooks/use-subject-relations.ts';

import SubjectRelations from './components/SubjectRelations.tsx';

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
