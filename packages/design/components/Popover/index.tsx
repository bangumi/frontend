import './style/index.less';

import classNames from 'classnames';
import React from 'react';

export interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Popover = ({ children, content, className }: PopoverProps) => {
  return (
    <div className={classNames('bgm-popover', className)}>
      {children}
      {/* 添加一个wrapper使绝对定位元素能够水平居中 */}
      <div className='bgm-popover__container'>
        <div className='bgm-popover__content'>{content}</div>
      </div>
    </div>
  );
};

export default Popover;
