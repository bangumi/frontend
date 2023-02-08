import './style';

import cn from 'classnames';
import type { PropsWithChildren, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

type ItemProps = PropsWithChildren<{
  label?: ReactNode;
}>;

function FormItem({ children, label }: ItemProps) {
  const { labelWidth, compact } = useContext(FormContext);
  return (
    <div className='bgm-form-item'>
      {!compact && (
        <div
          className='bgm-form-item-label'
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

const FormContext = createContext<{ labelWidth: number; compact: boolean }>({
  labelWidth: 12,
  compact: false,
});

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
        className={cn('bgm-form', { 'bgm-form--compact': compact }, className)}
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
