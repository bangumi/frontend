import './style';

import classNames from 'classnames';
import type { FC, MouseEventHandler } from 'react';
import React from 'react';

export type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'type' | 'onClick'> & {
  onClick?: MouseEventHandler; // desserts for story book
  type?: 'primary' | 'secondary' | 'text';
  shape?: 'square' | 'rounded';
  size?: 'large' | 'medium' | 'small';
  color?: 'default' | 'blue' | 'gray';
  htmlType?: JSX.IntrinsicElements['button']['type'];
};

const Button: FC<ButtonProps> = ({
  disabled = false,
  className,
  type = 'primary',
  shape = 'rounded',
  size = 'large',
  color = 'default',
  children,
  htmlType,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        'bgm-button',
        className,
        disabled && 'bgm-button--disabled',
        `bgm-button--${type}`,
        shape !== 'rounded' && `bgm-button--shape-${shape}`,
        size !== 'large' && `bgm-button--size-${size}`,
        color !== 'default' && `bgm-button--color-${color}`,
      )}
      type={htmlType}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
