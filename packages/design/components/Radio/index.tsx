import './style';

import cn from 'classnames';
import React, { forwardRef } from 'react';

type RadioProps = React.JSX.IntrinsicElements['input'] & {
  label: string;
};

type IRadio = React.ForwardRefExoticComponent<RadioProps> & {
  Group: React.FC<React.JSX.IntrinsicElements['div']>;
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
}) as IRadio;

function RadioGroup({ children, className, ...props }: React.JSX.IntrinsicElements['div']) {
  return (
    <div className={cn('bgm-radio-group', className)} {...props}>
      {children}
    </div>
  );
}
Radio.Group = RadioGroup;

export default Radio;
