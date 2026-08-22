import React from 'react';
import { Outlet } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';

const SubjectTopicPage = () => (
  <PageContainer>
    <Outlet />
  </PageContainer>
);

export default withErrorBoundary(SubjectTopicPage, { 404: <>Topic Not found</> });
