import type { PropsWithChildren } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@bangumi/design';
import { PureLink } from '@bangumi/design/components/Typography/Link';

import layoutStyle from './style.module.less';

export default function ErrorLayout({
  children,
  requestID,
}: PropsWithChildren<{ requestID?: string | null }>) {
  const navigate = useNavigate();
  return (
    <div className={layoutStyle.errorContainer}>
      <div className={layoutStyle.errorLayout}>
        <div className={layoutStyle.title}>呜咕，出错了…</div>
        <div className={layoutStyle.content}>{children}</div>
        <div className={layoutStyle.footer}>
          <Typography.Link to='/'>返回首页</Typography.Link>
          <span className={layoutStyle.footerDivider}>或</span>
          <PureLink
            onClick={() => {
              navigate(-1);
            }}
          >
            返回上页
          </PureLink>
        </div>
        {requestID && (
          <div className={layoutStyle.info}>
            <pre>request-id: {requestID}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
