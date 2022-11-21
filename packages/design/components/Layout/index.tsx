import classnames from 'classnames';
import type { FC } from 'react';
import React from 'react';

export interface LayoutProps {
  type: 'alpha' | 'beta';
  className?: string;
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}

const Index: FC<LayoutProps> = ({ leftChildren, rightChildren, type, className }) => {
  const containerClassNames = classnames('bgm-layout', `bgm-layout--${type}`, className);
  return (
    <div className={containerClassNames}>
      <div className='bgm-layout__left'>{leftChildren}</div>
      <div className='bgm-layout__right'>{rightChildren}</div>
    </div>
  );
};

export default Index;
