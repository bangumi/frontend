import React from 'react';
import { Outlet } from 'react-router-dom';

import ErrorBoundary from '@bangumi/website/components/ErrorBoundary';

const GroupReplyPage = () => (
  <ErrorBoundary fallback={{ 404: <>数据库中没有查询到指定话题，话题可能正在审核或已被删除。</> }}>
    <Outlet />
  </ErrorBoundary>
);

export default GroupReplyPage;
