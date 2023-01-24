import React from 'react';

import { Divider, Layout } from '@bangumi/design';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';

import style from './common.module.less';

const WikiEditPage = () => {
  return (
    <Layout
      type='alpha'
      leftChildren={
        <>
          <div className={style.title}>Bangumi 采用的版本</div>
          <Divider className={style.divider} />
        </>
      }
      rightChildren={
        <>
          <div className={style.title}>条目修订历史</div>
          <Divider className={style.divider} />
        </>
      }
    />
  );
};

export default withErrorBoundary(WikiEditPage);
