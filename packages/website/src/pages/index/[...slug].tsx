import React from 'react';

import NotFound from '@bangumi/website/components/NotFound.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';

const matchAll = () => {
  return (
    <PageContainer>
      <NotFound />
    </PageContainer>
  );
};

export default matchAll;
