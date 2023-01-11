import './style';

import cn from 'classnames';
import { keyBy } from 'lodash-es';
import React, { useMemo, useState } from 'react';

import { ArrowDown } from '@bangumi/icons';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  defaultValue: string;
  style?: React.CSSProperties;
  options: Option[];
  className?: string;
  onChange?: (value: Option | undefined) => void;
}

const Select = ({ options, style, defaultValue, className, onChange }: SelectProps) => {
  const [open, setOpen] = useState(false);
  // TODO: Click outside hidden.
  const [active, setActive] = useState(defaultValue);
  const handleClick = () => {
    setOpen(!open);
  };

  const optionsMap = useMemo(() => keyBy(options, 'value'), [options]);

  const handleOptionClick = (value: string) => {
    setActive(value);
    onChange?.(optionsMap[value]);
  };

  return (
    <div className={cn('bgm-select', className)} onClick={handleClick} style={style}>
      <div className='bgm-select__box'>
        <span>{optionsMap[active]?.label}</span>
        <ArrowDown className='bgm-select-arrow' />
      </div>
      {open && (
        <div className='bgm-select__dropdown'>
          {options.map((option) => (
            <div key={option.value} onClick={() => handleOptionClick(option.value)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
