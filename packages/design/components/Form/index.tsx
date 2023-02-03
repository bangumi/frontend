import './style';

import cn from 'classnames';
import type { PropsWithChildren, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

type ItemProps = PropsWithChildren<{
  label?: ReactNode;
}>;

function FormItem({ children, label }: ItemProps) {
  const { labelWidth } = useContext(FormContext);
  return (
    <div className='bgm-form-item'>
      <div
        className='bgm-form-item-label'
        style={{
          width: `${labelWidth}px`,
        }}
      >
        <label>{label}</label>
      </div>
      {children}
    </div>
  );
}

const FormContext = createContext<{ labelWidth: number }>({ labelWidth: 12 });

type FormProps = PropsWithChildren<{
  labelWidth?: number;
}> &
  JSX.IntrinsicElements['form'];

const Form = ({ children, labelWidth, className, onKeyDown, ...rest }: FormProps) => {
  return (
    <FormContext.Provider value={{ labelWidth: labelWidth ?? 12 }}>
      <form className={cn('bgm-form', className)} onKeyDown={onKeyDown} {...rest}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Item = FormItem;

export default Form;
