import './style';

import classnames from 'classnames';
import React, { forwardRef, useState } from 'react';

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
        className={classnames(
          'bgm-input__wrapper',
          {
            'bgm-input__wrapper--disabled': disabled,
            'bgm-input__wrapper--rounded': rounded,
            'bgm-input__wrapper--focus': focus,
          },
          wrapperClass,
        )}
        style={wrapperStyle}
      >
        {prefix !== undefined && <div className='bgm-input__prefix'>{prefix}</div>}
        <input
          type={type}
          className={classnames('bgm-input', {
            'bgm-input--align-right': align === 'right',
          })}
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
    <div className={classnames('bgm-input-group', className)} {...props}>
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
