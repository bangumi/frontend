import React from 'react';

import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import Helmet from '@bangumi/website/components/Helmet';
import { PageNeedLoginError } from '@bangumi/website/error';
import { useUser } from '@bangumi/website/hooks/use-user';

import HomePage from './index/components/HomePage';

function HomeIndex() {
  const { user, isLoading } = useUser();
  // 等待当前用户信息加载完成，避免首次渲染误判为未登录
  if (isLoading) {
    return null;
  }
  // 未登录首页暂不实现，保持原 404 行为
  if (!user) {
    throw PageNeedLoginError;
  }

  return (
    <>
      <Helmet title='首页' />
      <HomePage />
    </>
  );
}

export default withErrorBoundary(HomeIndex);
