import './style';

import cn from 'classnames';
import { keyBy } from 'lodash';
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
      {open ? (
        <ul className={cn('bgm-select__dropdown')} defaultValue={defaultValue}>
          {options.map((option) => (
            <li
              className={cn('bgm-select__dropdown-item')}
              key={option.value}
              value={option.value}
              onClick={() => {
                handleOptionClick(option.value);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Select;
