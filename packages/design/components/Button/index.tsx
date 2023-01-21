import './style';

import classNames from 'classnames';
import type { FC, MouseEventHandler } from 'react';
import React from 'react';

export type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'type' | 'onClick'> & {
  onClick?: MouseEventHandler; // desserts for story book
  type?: 'primary' | 'secondary' | 'text';
  shape?: 'square' | 'rounded';
  size?: 'normal';
  htmlType?: JSX.IntrinsicElements['button']['type'];
};

const Button: FC<ButtonProps> = ({
  disabled = false,
  className,
  type = 'primary',
  shape = 'square',
  size = 'normal',
  children,
  htmlType,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        'bgm-button',
        className,
        disabled && 'bgm-button__disabled',
        `bgm-button__${type}`,
        `bgm-button__${shape}`,
        `bgm-button__${size}`,
      )}
      type={htmlType}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
