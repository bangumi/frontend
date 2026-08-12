import type { FC } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

const pager = css({
  userSelect: 'none',
  width: '34px',
  height: '34px',
  borderRadius: '34px',
  border: 'solid 2px #e8e3e3',
  color: '#9f9b9b',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& + &': { marginLeft: '10px' },
  '&.bgm-pagination-pager--active': {
    color: '#fff',
    backgroundColor: '#f09199',
    borderColor: '#f09199',
    cursor: 'default',
  },
  _hover: {
    color: '#fff',
    backgroundColor: '#f09199',
    borderColor: '#f09199',
  },
});

export interface PagerProps {
  page: number;
  active: boolean;
  onClick: (p: number) => void;
}

const Pager: FC<PagerProps> = (props) => {
  const prefixCls = 'bgm-pagination-pager';
  const actualClassnames = cx(
    prefixCls,
    pager,
    `${prefixCls}--${props.page}`,
    props.active && `${prefixCls}--active`,
    !props.page && `${prefixCls}--disabled`,
  );

  const handleClick = (): void => {
    props.onClick(props.page);
  };

  return (
    <li
      data-testid='pagination-pager'
      title={`${props.page}`}
      className={actualClassnames}
      onClick={handleClick}
      tabIndex={0}
    >
      <a rel='nofollow'>{props.page}</a>
    </li>
  );
};

export default Pager;
