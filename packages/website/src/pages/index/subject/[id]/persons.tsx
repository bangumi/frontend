import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import Helmet from '@bangumi/website/components/Helmet.tsx';
import { useSubjectHome } from '@bangumi/website/hooks/use-subject-home.ts';
import { useSubjectStaffPersons } from '@bangumi/website/hooks/use-subject-staff-persons.ts';

import SubjectPersons from './components/SubjectPersons.tsx';

function SubjectPersonsPage() {
  const { id } = useParams();
  const subjectID = Number(id);
  const { data } = useSubjectHome(subjectID);
  const staffs = useSubjectStaffPersons(subjectID);

  if (!data || !staffs) {
    return null;
  }

  return (
    <>
      <Helmet title={`${data.subject.nameCN || data.subject.name} - 制作人员`} />
      <SubjectPersons subject={data.subject} staffs={staffs} />
    </>
  );
}

export default withErrorBoundary(SubjectPersonsPage, {
  404: () => <div>没有找到条目</div>,
});
