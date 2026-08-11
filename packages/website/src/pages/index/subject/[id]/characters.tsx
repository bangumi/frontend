import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import { useSubjectCharacters } from '@bangumi/website/hooks/use-subject-characters';
import { useSubjectHome } from '@bangumi/website/hooks/use-subject-home';

import SubjectCharacters from './components/SubjectCharacters';

function SubjectCharactersPage() {
  const { id } = useParams();
  const subjectID = Number(id);
  const { data } = useSubjectHome(subjectID);
  const characters = useSubjectCharacters(subjectID);

  if (!data || !characters) {
    return null;
  }

  return (
    <>
      <Helmet title={`${data.subject.nameCN || data.subject.name} - 角色`} />
      <SubjectCharacters subject={data.subject} characters={characters} />
    </>
  );
}

export default withErrorBoundary(SubjectCharactersPage, {
  404: () => <div>没有找到条目</div>,
});
