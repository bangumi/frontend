import './style';

import classNames from 'classnames';
import type { MouseEventHandler } from 'react';
import React from 'react';

import type { LinkProps } from '../Typography';
import Typography from '../Typography';

export interface ButtonCommonProps {
  type?: 'primary' | 'secondary' | 'text' | 'plain';
  shape?: 'square' | 'rounded';
  size?: 'large' | 'medium' | 'small';
  color?: 'default' | 'blue' | 'gray';
  /** 无内边距、边框及圆角，最小高度 */
}

export type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'type' | 'onClick'> &
  ButtonCommonProps & {
    onClick?: MouseEventHandler; // desserts for story book
    htmlType?: JSX.IntrinsicElements['button']['type'];
  };

const Button = ({
  disabled = false,
  className,
  type = 'primary',
  shape = 'rounded',
  size = 'large',
  color = 'default',
  children,
  htmlType,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        'bgm-button',
        className,
        { 'bgm-button--disabled': disabled },
        `bgm-button--${type}`,
        {
          [`bgm-button--shape-${shape}`]: shape !== 'rounded',
          [`bgm-button--size-${size}`]: size !== 'large',
          [`bgm-button--color-${color}`]: color !== 'default',
        },
      )}
      type={htmlType}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export type ButtonLinkProps = LinkProps & ButtonCommonProps;

export const ButtonLink = ({
  children,
  className,
  type = 'primary',
  shape = 'rounded',
  size = 'large',
  color = 'default',
  ...props
}: ButtonLinkProps) => {
  return (
    <Typography.Link
      className={classNames('bgm-button', className, 'bgm-button--link', `bgm-button--${type}`, {
        [`bgm-button--shape-${shape}`]: shape !== 'rounded',
        [`bgm-button--size-${size}`]: size !== 'large',
        [`bgm-button--color-${color}`]: color !== 'default',
      })}
      noStyle
      {...props}
    >
      {children}
    </Typography.Link>
  );
};

Button.Link = ButtonLink;

export default Button;
