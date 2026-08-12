import type { JSX } from 'react';
import React, { forwardRef } from 'react';

import { css, cx } from '@bangumi/styled-system/css';

const radio = css({
  '& > input': {
    appearance: 'none',
    height: '0.75rem',
    width: '0.75rem',
    borderRadius: '9999px',
    boxShadow: 'inset 0 0 0 1px #595555, inset 0 0 0 3px white', // ring style!!
    margin: '0',
    marginRight: '8px',
    '&:checked': {
      background: '#595555',
    },
  },
  '& > label': {
    userSelect: 'none',
    fontSize: '1rem',
  },
});

const radioGroup = css({
  display: 'inline-flex',
  gap: '0.5rem',
});

type RadioProps = JSX.IntrinsicElements['input'] & {
  label: string;
};

type IRadio = React.ForwardRefExoticComponent<RadioProps> & {
  Group: React.FC<JSX.IntrinsicElements['div']>;
};

/**
 * 在许多时候，传入 id 是有必要的，这使得组件点击 label 时可切换组件状态
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, onClick, id, label, type = 'radio', ...props },
  ref,
) {
  return (
    <div className={cx('bgm-radio', radio, className)} onClick={onClick}>
      <input ref={ref} type={type} id={id} {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}) as IRadio;

function RadioGroup({ children, className, ...props }: JSX.IntrinsicElements['div']) {
  return (
    <div className={cx('bgm-radio-group', radioGroup, className)} {...props}>
      {children}
    </div>
  );
}
Radio.Group = RadioGroup;

export default Radio;
