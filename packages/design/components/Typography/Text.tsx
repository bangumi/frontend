import type { PropsWithChildren } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

export interface TextProps {
  className?: string;
  style?: React.CSSProperties;
  type?: 'default' | 'secondary';
}

const text = css({ color: 'text.primary' });

const textSecondary = css({ color: 'text.secondary' });

const Text = ({ children, className, style, type = 'default' }: PropsWithChildren<TextProps>) => {
  return (
    <span
      className={cx('bgm-text', text, type === 'secondary' && textSecondary, className)}
      style={style}
    >
      {children}
    </span>
  );
};

export default Text;
