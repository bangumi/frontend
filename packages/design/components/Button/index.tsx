import type { JSX, MouseEventHandler } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

import type { LinkProps } from '../Typography';
import Typography from '../Typography';

const button = css({
  cursor: 'pointer',
  userSelect: 'none',
  font: 'inherit',
  fontSize: 'body',
  fontWeight: 'semibold',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: 'flex',
  gap: '1',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  border: '2px transparent solid',
  height: 'var(--height)',
  lineHeight: 'var(--height)',
  borderRadius: 'calc(var(--height) / 2)',
  // 默认大小：large
  '--height': 'var(--sizes-control-md)',
  padding: '0 24px',
  transitionProperty: 'background-color, border-color, color, opacity',
  transitionDuration: 'normal',
  transitionTimingFunction: 'standard',
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'focusRing',
    outlineOffset: '2px',
  },
  '&.bgm-button--primary': {
    backgroundColor: 'accent',
    color: 'accent.fg',
    _hover: { backgroundColor: 'accent.hover' },
    _active: { backgroundColor: 'accent.hover' },
    '&.bgm-button--color-gray': {
      backgroundColor: 'bg.muted',
      color: 'text.primary',
      _hover: { backgroundColor: 'border.subtle' },
      _active: { backgroundColor: 'border.subtle' },
      '&.bgm-button--disabled': {
        backgroundColor: 'bg.muted',
        color: 'text.disabled',
      },
    },
    '&.bgm-button--disabled': {
      backgroundColor: 'bg.muted',
      color: 'text.disabled',
    },
  },
  '&.bgm-button--secondary': {
    backgroundColor: 'transparent',
    borderColor: 'border.subtle',
    color: 'text.secondary',
    _hover: {
      backgroundColor: 'bg.subtle',
      color: 'text.primary',
    },
    _active: {
      backgroundColor: 'bg.muted',
      color: 'text.primary',
    },
    '&.bgm-button--color-blue': {
      borderColor: 'link',
      color: 'link',
      _hover: {
        backgroundColor: 'link.hover',
        color: 'accent.fg',
      },
      _active: {
        backgroundColor: 'link.hover',
        color: 'accent.fg',
      },
      '&.bgm-button--disabled': {
        backgroundColor: 'bg.muted',
        borderColor: 'border.subtle',
        color: 'text.disabled',
      },
    },
    '&.bgm-button--disabled': {
      backgroundColor: 'bg.muted',
      borderColor: 'border.subtle',
      color: 'text.disabled',
    },
  },
  '&.bgm-button--primary.bgm-button--color-blue': {
    backgroundColor: 'link',
    color: 'accent.fg',
    _hover: { backgroundColor: 'link.hover' },
    _active: { backgroundColor: 'link.hover' },
    '&.bgm-button--disabled': {
      backgroundColor: 'bg.muted',
      color: 'text.disabled',
    },
  },
  '&.bgm-button--text': {
    backgroundColor: 'transparent',
    color: 'text.secondary',
    _hover: { color: 'link' },
    _active: { color: 'link.hover' },
    '&.bgm-button--disabled': {
      backgroundColor: 'transparent',
      color: 'text.disabled',
    },
  },
  '&.bgm-button--size-medium': {
    '--height': 'var(--sizes-control-sm)',
    padding: '0 12px',
  },
  '&.bgm-button--size-small': {
    '--height': '24px',
    padding: '0 10px',
    fontSize: 'bodySm',
  },
  '&.bgm-button--shape-square': {
    borderRadius: '0',
  },
  '&.bgm-button--disabled': {
    cursor: 'default',
    pointerEvents: 'none',
    backgroundColor: 'bg.muted',
    borderColor: 'border.subtle',
    color: 'text.disabled',
    _hover: {
      backgroundColor: 'bg.muted',
      borderColor: 'border.subtle',
      color: 'text.disabled',
    },
    _active: {
      backgroundColor: 'bg.muted',
      borderColor: 'border.subtle',
      color: 'text.disabled',
    },
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
    lineHeight: 'body',
    backgroundColor: 'transparent',
    color: 'text.secondary',
    _hover: { color: 'link' },
    _active: { color: 'link.hover' },
    '&.bgm-button--disabled': {
      backgroundColor: 'transparent',
      color: 'text.disabled',
    },
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
  type = 'plain',
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
