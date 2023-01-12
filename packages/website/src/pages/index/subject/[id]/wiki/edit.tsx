import React from 'react';

import { Divider, Layout } from '@bangumi/design';
import { withErrorBoundary } from '@bangumi/website/components/ErrorBoundary';
import { _TEST_SUBJECTS_ } from '@bangumi/website/shared';

import style from './common.module.less';

const WikiEditPage = () => {
  const id = _TEST_SUBJECTS_;
  return (
    <Layout
      type='alpha'
      leftChildren={
        <>
          <div className={style.title}>Bangumi 采用的版本</div>
          <Divider className={style.divider} />
          {/* <form></form> */}
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
