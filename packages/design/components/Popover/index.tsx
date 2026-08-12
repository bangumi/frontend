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
  display: 'inline-block',
  '& .bgm-popover__container': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '& .bgm-popover__content': {
    border: '1px solid #e8e3e3',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    backgroundColor: 'white',
    borderRadius: '17px',
    position: 'absolute',
    visibility: 'hidden',
    opacity: '0',
    transition: 'visibility 0s, opacity 0.15s linear',
    zIndex: '99',
    display: 'none',
  },
  _hover: {
    '& .bgm-popover__content': {
      visibility: 'visible',
      opacity: '1',
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
