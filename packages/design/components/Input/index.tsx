import type { JSX } from 'react';
import React, { forwardRef, useState } from 'react';

import { css, cx } from '@bangumi/styled-system/css';

const bgmInput = css({
  fontSize: '1rem',
  lineHeight: '1.5rem',
  outlineStyle: 'none',
  border: 'none',
  color: '#1f1c1c',
  padding: '0',
  width: '100%',
  '&.bgm-input--align-right': {
    textAlign: 'right',
  },
  '&::placeholder': {
    color: '#e8e3e3',
  },
});

const inputWrapper = css({
  display: 'inline-flex',
  position: 'relative',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem 1rem',
  border: '2px solid #e8e3e3',
  borderRadius: '22px',
  '&.bgm-input__wrapper--rounded': {
    padding: '0.5rem 0.75rem',
    borderRadius: '12px',
  },
  '&.bgm-input__wrapper--disabled, &.bgm-input__wrapper--disabled *': {
    cursor: 'not-allowed',
    background: '#f4f4f5',
  },
  '&.bgm-input__wrapper--focus': {
    // fix-me: no border bottom in WikiBeginnerEditor
    borderColor: '#c8c2c2',
  },
  '& .bgm-input__prefix': {
    display: 'flex',
    alignItems: 'center',
    marginRight: '12px',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    fontWeight: '600',
    color: '#595555',
    lineHeight: '1.625rem',
    '& svg': {
      width: '19px',
      height: '19px',
    },
  },
  // 在 Form 中显示为普通圆角，并调整 placeholder 颜色
  '.bgm-form &': {
    borderRadius: '12px',
    '& .bgm-input::placeholder': { color: '#9f9b9b' },
  },
  '.bgm-form--compact > &': {
    padding: '0.75rem',
    '&:not(:first-child)': {
      borderTop: 'none',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    },
    '&:not(:last-child)': {
      borderBottom: 'none',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-1px',
        width: 'calc(100% - 24px)',
        borderBottom: '2px dotted #e8e3e3',
      },
    },
  },
});

const inputGroup = css({
  whiteSpace: 'nowrap',
  '& .bgm-input__wrapper': {
    '&:not(:first-of-type)': {
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
      borderLeft: '0',
      '&::before': {
        position: 'absolute',
        left: '0',
        content: '""',
        height: '70%',
        width: '1px',
        background: '#e8e3e3',
      },
    },
    '&:not(:last-of-type)': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      borderRight: '0',
    },
  },
});

export type InputProps = Omit<JSX.IntrinsicElements['input'], 'prefix'> & {
  /** 外层 wrapper 的样式 */
  wrapperStyle?: React.CSSProperties;
  /** 外层 wrapper 的自定义类名 */
  wrapperClass?: string;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 对齐方式 */
  align?: 'right' | 'left';
  /** 是否为普通圆角，默认为胶囊形全圆角 */
  rounded?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      wrapperStyle,
      wrapperClass,
      prefix,
      suffix,
      align = 'left',
      disabled,
      rounded = false,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const [focus, setFocus] = useState(false);
    return (
      <div
        className={cx(
          'bgm-input__wrapper',
          inputWrapper,
          disabled && 'bgm-input__wrapper--disabled',
          rounded && 'bgm-input__wrapper--rounded',
          focus && 'bgm-input__wrapper--focus',
          wrapperClass,
        )}
        style={wrapperStyle}
      >
        {prefix !== undefined && <div className='bgm-input__prefix'>{prefix}</div>}
        <input
          type={type}
          className={cx('bgm-input', bgmInput, align === 'right' && 'bgm-input--align-right')}
          ref={ref}
          disabled={disabled}
          onFocus={(e) => {
            setFocus(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {suffix}
      </div>
    );
  },
);

export type InputGroupProps = JSX.IntrinsicElements['div'];

export const InputGroup = ({ children, className, ...props }: InputGroupProps) => {
  return (
    <div className={cx('bgm-input-group', inputGroup, className)} {...props}>
      {children}
    </div>
  );
};

/*
  https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-1008349828
  如果使用
  `type IInput = React.FC<InputProps> & { Group: React.FC<InputGroupProps> }`
  `const CompoundedInput = Input as IInput;`
  这样的形式，会导致 Storybook 无法正常生成文档
*/
const CompoundedInput = Object.assign(Input, { Group: InputGroup });

export default CompoundedInput;
