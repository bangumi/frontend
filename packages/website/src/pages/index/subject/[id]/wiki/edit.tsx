import React from 'react';

import { Divider, Layout } from '@bangumi/design/index.tsx';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary/index.tsx';

import { divider, title } from './common.ts';

const WikiEditPage = () => {
  return (
    <Layout
      type='alpha'
      leftChildren={
        <>
          <div className={title}>Bangumi 采用的版本</div>
          <Divider className={divider} />
        </>
      }
      rightChildren={
        <>
          <div className={title}>条目修订历史</div>
          <Divider className={divider} />
        </>
      }
    />
  );
};

export default withErrorBoundary(WikiEditPage);
