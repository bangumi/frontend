import { keyBy } from 'lodash-es';
import React, { useMemo, useState } from 'react';

import { ArrowDown } from '@bangumi/icons/index.tsx';
import { css, cx } from '@bangumi/styled-system/css';

const bgmSelect = css({
  display: 'inline-flex',
  boxSizing: 'border-box',
  position: 'relative',
  padding: '0.5rem 1rem',
  border: '2px solid #e8e3e3',
  borderRadius: '12px',
  userSelect: 'none',
  fontSize: '1rem',
  verticalAlign: 'bottom',
  cursor: 'pointer',
  '& select': {
    position: 'absolute',
    left: '0',
    top: '0',
    height: '100%',
    width: '100%',
    opacity: '0',
  },
  '.bgm-input-group &': {
    '&:not(:last-of-type)': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      borderRight: '0',
    },
  },
});

const selectBox = css({
  display: 'flex',
  flex: '1',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& span': {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: '#1f1c1c',
  },
});

const selectArrow = css({ display: 'inline-block' });

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
    <div className={cx('bgm-select', bgmSelect, className)} onClick={handleClick} style={style}>
      <div className={selectBox}>
        <span>{optionsMap[active]?.label}</span>
        <ArrowDown className={selectArrow} />
      </div>
      <select
        defaultValue={defaultValue}
        onChange={(e) => {
          handleOptionClick(e.target.value);
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
