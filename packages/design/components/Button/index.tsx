import './style';

import classNames from 'classnames';
import type { FC, MouseEventHandler, PropsWithChildren } from 'react';
import React from 'react';

export interface ButtonProps {
  disabled?: boolean;
  onClick?: MouseEventHandler;
  className?: string;
  type?: 'primary' | 'secondary' | 'text';
  shape?: 'square' | 'rounded';
  size?: 'normal';
  htmlType?: JSX.IntrinsicElements['button']['type'];
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  disabled = false,
  onClick,
  className,
  type = 'primary',
  shape = 'square',
  size = 'normal',
  children,
  htmlType,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        'bgm-button',
        className,
        {
          'bgm-button__disabled': disabled,
        },
        `bgm-button__${type}`,
        `bgm-button__${shape}`,
        `bgm-button__${size}`,
      )}
      onClick={onClick}
      type={htmlType}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
