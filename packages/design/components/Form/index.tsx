import './style';

import cn from 'classnames';
import type { PropsWithChildren, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

type ItemProps = PropsWithChildren<{
  label?: ReactNode;
}>;

const Item = ({ children, label }: ItemProps) => {
  const { labelCol } = useContext(FormContext);
  return (
    <div className='bgm-form-item'>
      <div
        className='bgm-form-item-label'
        style={{
          width: `${labelCol}px`,
        }}
      >
        <label>{label}</label>
      </div>
      {children}
    </div>
  );
};

const FormContext = createContext<{ labelCol: number }>({ labelCol: 12 });

type FormProps = PropsWithChildren<{
  labelCol?: number;
}> &
  JSX.IntrinsicElements['form'];

const Form = ({ children, labelCol, className, ...props }: FormProps) => {
  return (
    <FormContext.Provider value={{ labelCol: labelCol ?? 12 }}>
      <form className={cn('bgm-form', className)} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Item = Item;

export default Form;
