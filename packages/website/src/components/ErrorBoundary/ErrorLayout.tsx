import type { PropsWithChildren } from 'react';
import React from 'react';

import { Typography } from '@bangumi/design';

import layoutStyle from './style.module.less';

export default function ErrorLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className={layoutStyle.errorContainer}>
      <div className={layoutStyle.errorLayout}>
        <div className={layoutStyle.title}>呜咕，出错了…</div>
        <div className={layoutStyle.content}>{children}</div>
        <div className={layoutStyle.footer}>
          <Typography.Link to='/'>返回首页</Typography.Link>
          <span className={layoutStyle.footerDivider}>或</span>
          <Typography.Link to='..'>返回上页</Typography.Link>
        </div>
      </div>
    </div>
  );
}
