import React from 'react';
import { Outlet } from 'react-router-dom';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import PageContainer from '@bangumi/website/components/PageContainer';

const GroupTopicPage = () => (
  <PageContainer>
    <Outlet />
  </PageContainer>
);

export default withErrorBoundary(GroupTopicPage, { 404: <>Topic Not found</> });
