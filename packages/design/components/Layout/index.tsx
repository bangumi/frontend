import type { FC } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

const layout = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr)) 246px',
  '&.bgm-layout--alpha': {
    gap: '30px',
    '& .bgm-layout__left': {
      gridColumn: 'span 4 / span 4',
      '@media (max-width: 1024px)': {
        gridColumn: 'span 5 / span 5',
      },
    },
    '& .bgm-layout__right': {
      '@media (max-width: 1024px)': {
        display: 'none',
      },
    },
    // 窄屏隐藏右侧栏后，固定 246px 的侧栏列与 gap 仍占空间导致 grid 溢出，
    // 收窄为单列让主栏占满容器
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export interface LayoutProps {
  type: 'alpha' | 'beta';
  className?: string;
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}

const Index: FC<LayoutProps> = ({ leftChildren, rightChildren, type, className }) => {
  const containerClassNames = cx('bgm-layout', `bgm-layout--${type}`, layout, className);
  return (
    <div className={containerClassNames}>
      <div className='bgm-layout__left'>{leftChildren}</div>
      <div className='bgm-layout__right'>{rightChildren}</div>
    </div>
  );
};

export default Index;
