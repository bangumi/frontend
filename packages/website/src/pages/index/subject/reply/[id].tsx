import React from 'react';
import { Outlet } from 'react-router-dom';

import ErrorBoundary from '@bangumi/website/components/ErrorBoundary/index.tsx';
import PageContainer from '@bangumi/website/components/PageContainer/index.tsx';

const SubjectReplyPage = () => (
  <ErrorBoundary fallback={{ 404: <>数据库中没有查询到指定话题，话题可能正在审核或已被删除。</> }}>
    <PageContainer>
      <Outlet />
    </PageContainer>
  </ErrorBoundary>
);

export default SubjectReplyPage;
