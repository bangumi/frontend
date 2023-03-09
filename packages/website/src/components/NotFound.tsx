import React from 'react';

import ErrorLayout from './ErrorBoundary/ErrorLayout';

function NotFound() {
  return <ErrorLayout>没有找到页面</ErrorLayout>;
}

export default NotFound;
