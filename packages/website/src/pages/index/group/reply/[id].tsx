import React from 'react';
import { Outlet } from 'react-router-dom';

import ErrorBoundary from '@bangumi/website/components/ErrorBoundary';

const GroupReplyPage = () => (
  <ErrorBoundary fallback={<>Reply Not found</>}>
    <Outlet />
  </ErrorBoundary>
);

export default GroupReplyPage;
