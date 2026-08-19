import type { JSX, MouseEventHandler } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

import type { LinkProps } from '../Typography';
import Typography from '../Typography';

const button = css({
  cursor: 'pointer',
  userSelect: 'none',
  fontSize: '14px',
  fontWeight: '600',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: 'flex',
  gap: '0.25rem',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  border: '2px transparent solid',
  height: 'var(--height)',
  lineHeight: 'var(--height)',
  borderRadius: 'calc(var(--height) / 2)',
  /* 与原站统一的交互动效节奏（all .2s ease-in-out） */
  transition: 'all .2s ease-in-out',
  // 默认大小：large
  '--height': '38px',
  padding: '0 32px',
  '&.bgm-button--primary': {
    backgroundColor: '#f09199',
    color: '#fff',
    '&.bgm-button--color-blue': { backgroundColor: '#54b5df' },
    '&.bgm-button--color-gray': {
      backgroundColor: '#e8e3e3',
      color: '#595555',
    },
  },
  '&.bgm-button--secondary': {
    backgroundColor: 'transparent',
    borderColor: '#e8e3e3',
    color: '#9f9b9b',
    _hover: {
      backgroundColor: '#e8e3e3',
      color: '#595555',
    },
    '&.bgm-button--color-blue': {
      borderColor: '#54b5df',
      color: '#54b5df',
      _hover: {
        backgroundColor: '#54b5df',
        color: '#fff',
      },
    },
  },
  '&.bgm-button--text': {
    backgroundColor: 'transparent',
    color: '#9f9b9b',
    _hover: { color: '#54b5df' },
  },
  '&.bgm-button--size-medium': {
    '--height': '30px',
    padding: '0 13px',
  },
  '&.bgm-button--size-small': {
    '--height': '24px',
    padding: '0 17px',
  },
  '&.bgm-button--shape-square': {
    borderRadius: '0',
  },
  '&.bgm-button--disabled': {
    cursor: 'default',
  },
  '&.bgm-button--link': {
    display: 'inline-flex',
    textDecoration: 'none',
  },
  '&.bgm-button--plain': {
    padding: '0',
    borderRadius: '0',
    border: 'none',
    height: 'auto',
    lineHeight: '14px',
    backgroundColor: 'transparent',
    color: '#9f9b9b',
    _hover: { color: '#54b5df' },
  },
});

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
      className={cx(
        'bgm-button',
        button,
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
      className={cx(
        'bgm-button',
        button,
        className,
        'bgm-button--link',
        `bgm-button--${type}`,
        shape !== 'rounded' && `bgm-button--shape-${shape}`,
        size !== 'large' && `bgm-button--size-${size}`,
        color !== 'default' && `bgm-button--color-${color}`,
      )}
      noStyle
      {...props}
    >
      {children}
    </Typography.Link>
  );
};

Button.Link = ButtonLink;

export default Button;
