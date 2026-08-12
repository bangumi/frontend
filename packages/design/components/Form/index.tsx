import type { JSX, PropsWithChildren, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

import { css, cx } from '@bangumi/styled-system/css';

const form = css({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '1rem',
  '&.bgm-form--compact': { gap: '0' },
});

const formItem = css({
  display: 'flex',
  '@media (max-width: 640px)': {
    flexDirection: 'column',
  },
});

const formItemLabel = css({
  display: 'inline-block',
  fontWeight: '400',
  fontSize: '1.125rem',
  lineHeight: '25px',
  color: '#9f9b9b',
  '& > label': {
    display: 'flex',
    alignItems: 'center',
    height: '38px',
  },
});

type ItemProps = PropsWithChildren<{
  label?: ReactNode;
}>;

function FormItem({ children, label }: ItemProps) {
  const { labelWidth, compact } = useFormContext();
  return (
    <div className={formItem}>
      {!compact && (
        <div
          className={formItemLabel}
          style={{
            width: `${labelWidth}px`,
          }}
        >
          <label>{label}</label>
        </div>
      )}
      {children}
    </div>
  );
}

const FormContext = createContext<{ labelWidth: number; compact: boolean } | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext() may only be used in the context of a <Form> component.');
  }
  return context;
};

export const useInFormContext = () => {
  const context = useContext(FormContext);
  return context !== null;
};

type FormProps = PropsWithChildren<{
  labelWidth?: number;
  compact?: boolean;
}> &
  JSX.IntrinsicElements['form'];

const Form = ({
  children,
  labelWidth,
  className,
  onKeyDown,
  compact = false,
  ...rest
}: FormProps) => {
  return (
    <FormContext.Provider value={{ labelWidth: labelWidth ?? 12, compact }}>
      <form
        className={cx('bgm-form', compact && 'bgm-form--compact', className)}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Item = FormItem;

export default Form;
