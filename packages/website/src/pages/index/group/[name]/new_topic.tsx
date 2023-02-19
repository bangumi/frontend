import React from 'react';
import { Outlet } from 'react-router-dom';

import ErrorBoundary from '@bangumi/website/components/ErrorBoundary';

const GroupNewTopicPage = () => {
  return (
    <ErrorBoundary fallback={<>Group Not found</>}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default GroupNewTopicPage;
