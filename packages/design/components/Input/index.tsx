import './style';

import classnames from 'classnames';
import React, { forwardRef } from 'react';

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
};

type IInput = React.ForwardRefExoticComponent<InputProps> & {
  Group: React.FC<JSX.IntrinsicElements['div']>;
};

// https://github.com/jsx-eslint/eslint-plugin-react/issues/3140
const Input = forwardRef<HTMLInputElement, InputProps>(function InputWithRef(
  { type = 'text', wrapperStyle, wrapperClass, prefix, suffix, align, disabled, ...rest },
  ref,
) {
  return (
    <div
      className={classnames(
        'bgm-input__wrapper',
        {
          'bgm-input__wrapper--disabled': disabled,
        },
        wrapperClass,
      )}
      style={wrapperStyle}
    >
      {prefix}
      <input
        type={type}
        className={classnames('bgm-input', { 'bgm-input--align-right': align === 'right' })}
        ref={ref}
        disabled={disabled}
        {...rest}
      />
      {suffix}
    </div>
  );
}) as IInput;

function InputGroup({ children, className, ...props }: JSX.IntrinsicElements['div']) {
  return (
    <div className={classnames('bgm-input-group', className)} {...props}>
      {children}
    </div>
  );
}

Input.Group = InputGroup;

export default Input;
