import React, { forwardRef } from 'react';
import classnames from 'classnames';

export interface InputProps {
  /* 同原生 input 标签 `type` */
  type?: string;
  /* 同原生 `placeholder` */
  placeholder?: string;
  /* 外层 wrapper 的样式 */
  wrapperStyle?: React.CSSProperties;
  /* 外层 wrapper 的自定义类名 */
  wrapperClass?: string;
  /* 前缀 */
  prefix?: React.ReactNode;
  /* 后缀 */
  suffix?: React.ReactNode;
}

/* eslint-disable react/prop-types */
// https://github.com/jsx-eslint/eslint-plugin-react/issues/3140
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', wrapperStyle, wrapperClass, prefix, suffix, placeholder, ...rest }, ref) => {
    return (
      <div className={classnames('bgm-input__wrapper', wrapperClass)} style={wrapperStyle}>
        {prefix && prefix}
        <input type={type} className='bgm-input' placeholder={placeholder} ref={ref} {...rest} />
        {suffix && suffix}
      </div>
    );
  },
);

export default Input;
