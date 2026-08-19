import type { PropsWithChildren } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

/**
 * 复刻原站 a.thumbTip 的 Bootstrap tooltip：
 * 黑底半透明 + 毛玻璃 + 顶部小三角，hover 淡入（opacity .9），纯 CSS 实现
 */
const tooltip = css({
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'top',
  '& .bgm-tooltip__bubble': {
    position: 'absolute',
    bottom: 'calc(100% + 6px)',
    left: '50%',
    zIndex: '1020',
    boxSizing: 'border-box',
    width: 'max-content',
    maxWidth: '200px',
    padding: '3px 8px',
    color: '#fff',
    fontSize: '11px',
    lineHeight: '1.5',
    textAlign: 'left',
    whiteSpace: 'normal',
    background: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '4px',
    backdropFilter: 'blur(5px)',
    visibility: 'hidden',
    opacity: '0',
    transform: 'translateX(-50%)',
    transition: 'opacity .15s linear, visibility 0s linear .15s',
    pointerEvents: 'none',
    '& small': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    _after: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: '-5px',
      width: '0',
      height: '0',
      content: '""',
      borderTop: '5px solid rgba(0, 0, 0, 0.6)',
      borderRight: '5px solid transparent',
      borderLeft: '5px solid transparent',
    },
  },
  '&:hover .bgm-tooltip__bubble, &:focus-within .bgm-tooltip__bubble': {
    visibility: 'visible',
    opacity: '0.9',
    transition: 'opacity .15s linear, visibility 0s',
  },
});

export interface TooltipProps {
  /** 气泡内容，可含 <small> 等内联元素 */
  content: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({ content, children, className }) => {
  return (
    <span className={cx(tooltip, className)}>
      {children}
      <span className='bgm-tooltip__bubble' role='tooltip'>
        {content}
      </span>
    </span>
  );
};

export default Tooltip;
