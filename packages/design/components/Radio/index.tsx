import './style';

import cn from 'classnames';
import React, { forwardRef } from 'react';

type RadioProps = JSX.IntrinsicElements['input'] & {
  label: string;
};

/**
 * 在许多时候，传入 id 是有必要的，这使得组件点击 label 时可切换组件状态
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, onClick, id, label, type = 'radio', ...props },
  ref,
) {
  return (
    <div className={cn('bgm-radio', className)} onClick={onClick}>
      <input ref={ref} type={type} id={id} {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
});

export default Radio;
