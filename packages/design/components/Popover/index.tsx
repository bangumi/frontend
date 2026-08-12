import './style/index.less';

import classNames from 'classnames';
import React from 'react';

import { css } from '@bangumi/styled-system/css';

export interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

// 未 hover 时隐藏弹出内容，避免 absolute 菜单在移动端撑出水平滚动
const popover = css({
  '& .bgm-popover__content': {
    display: 'none',
  },
  _hover: {
    '& .bgm-popover__content': {
      display: 'block',
    },
  },
});

const Popover = ({ children, content, className }: PopoverProps) => {
  return (
    <div className={classNames('bgm-popover', popover, className)}>
      {children}
      {/* 添加一个wrapper使绝对定位元素能够水平居中 */}
      <div className='bgm-popover__container'>
        <div className='bgm-popover__content'>{content}</div>
      </div>
    </div>
  );
};

export default Popover;
