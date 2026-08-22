import React from 'react';
import { useParams } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import { usePersonHome } from '@bangumi/website/hooks/use-person-home.ts';

import PersonDetail from './PersonDetail.tsx';

function PersonPage() {
  const { id } = useParams();
  const personID = Number(id);
  const { data } = usePersonHome(personID);

  if (!data) {
    return null;
  }

  return <PersonDetail data={data} />;
}

export default withErrorBoundary(PersonPage, {
  404: () => <div>没有找到人物</div>,
});
