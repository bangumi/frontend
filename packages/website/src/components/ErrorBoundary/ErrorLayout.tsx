import type { PropsWithChildren } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PureLink } from '@bangumi/design/components/Typography/Link.tsx';
import { Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';

const errorContainer = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  inset: 0,
});

const errorLayout = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '400px',
  margin: '0 auto',
  '@media (max-width: 640px)': {
    width: '50%',
  },
});

const title = css({
  fontWeight: '600',
  fontSize: '24px',
  lineHeight: '34px',
  color: '#f09199',
});

const content = css({ color: '#595555' });

const info = css({ color: '#595555', fontSize: '14px' });

const footer = css({ fontWeight: '600', color: '#9f9b9b' });

const footerDivider = css({ fontWeight: '400', margin: '0 6px' });

export default function ErrorLayout({
  children,
  requestID,
}: PropsWithChildren<{ requestID?: string | null }>) {
  const navigate = useNavigate();
  return (
    <div className={errorContainer}>
      <div className={errorLayout}>
        <div className={title}>呜咕，出错了…</div>
        <div className={content}>{children}</div>
        <div className={footer}>
          <Typography.Link to='/'>返回首页</Typography.Link>
          <span className={footerDivider}>或</span>
          <PureLink
            onClick={() => {
              navigate(-1);
            }}
          >
            返回上页
          </PureLink>
        </div>
        {requestID && (
          <div className={info}>
            <pre>request-id: {requestID}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
