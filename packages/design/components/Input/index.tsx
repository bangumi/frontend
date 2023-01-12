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
  alight?: 'right' | 'left';
};

type IInput = React.ForwardRefExoticComponent<InputProps> & {
  Group: React.FC<JSX.IntrinsicElements['div']>;
};

/* eslint-disable react/prop-types */
// https://github.com/jsx-eslint/eslint-plugin-react/issues/3140
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', wrapperStyle, wrapperClass, prefix, suffix, alight, ...rest }, ref) => {
    return (
      <div className={classnames('bgm-input__wrapper', wrapperClass)} style={wrapperStyle}>
        {prefix}
        <input
          type={type}
          className={classnames('bgm-input', alight === 'right' && 'bgm-input--alight-right')}
          ref={ref}
          {...rest}
        />
        {suffix}
      </div>
    );
  },
) as IInput;

Input.Group = ({ children, className, ...props }) => {
  return (
    <div className={classnames('bgm-input-group', className)} {...props}>
      {children}
    </div>
  );
};

export default Input;
