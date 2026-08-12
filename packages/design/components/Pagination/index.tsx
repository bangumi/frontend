import type { FC } from 'react';
import React, { useState } from 'react';

import { VerticalLeft, VerticalRight } from '@bangumi/icons';
import { css, cx } from '@bangumi/styled-system/css';

import Pager from './Pager';

const pagination = css({
  display: 'flex',
});

const paginationNav = css({
  userSelect: 'none',
  cursor: 'pointer',
  height: '34px',
  width: '80px',
  borderRadius: '17px',
  border: 'solid 2px #e8e3e3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  _hover: {
    backgroundColor: '#f09199',
    borderColor: '#f09199',
    '& .bgm-pagination-icon': { fill: '#fff' },
  },
  '&.bgm-pagination-prev': { marginRight: '30px' },
  '&.bgm-pagination-next': { marginLeft: '30px' },
  '&.bgm-pagination-prev--hide, &.bgm-pagination-next--hide': {
    visibility: 'hidden',
  },
});

const paginationIcon = css({ fill: '#9f9b9b' });

export interface PaginationProps {
  /** 当前偏移 */
  currentPage?: number;
  /** 单页的数据条数 */
  pageSize?: number;
  /** 数据的总条数 */
  total?: number;
  /** 页码改变的回调 */
  onChange?: (offset: number) => void;

  /** 自定义 classname */
  wrapperClass?: string;
}

function calculatePage(pageSize: number, total: number): number {
  return Math.floor((total - 1) / pageSize) + 1;
}

const Pagination: FC<PaginationProps> = ({
  currentPage = 1,
  pageSize = 30,
  total = 0,
  wrapperClass,
  ...restProps
}) => {
  const [current, setCurrent] = useState(() => currentPage);

  // 不需要分页的时候不渲染
  if (total < pageSize) {
    return null;
  }

  const allPages = calculatePage(pageSize, total);
  const handleChange = (page: number): void => {
    setCurrent(page);
    restProps.onChange?.(page);
  };

  // prev, next
  const hasPrev = current > 1;
  const prev = (): void => {
    if (hasPrev) {
      handleChange(current - 1);
    }
  };
  const hasNext = current < allPages;
  const next = (): void => {
    if (hasNext) {
      handleChange(current + 1);
    }
  };

  const prevButton = (
    <li
      onClick={prev}
      data-testid='pagination-prev'
      className={cx('bgm-pagination-prev', paginationNav, !hasPrev && 'bgm-pagination-prev--hide')}
    >
      <VerticalLeft className={cx('bgm-pagination-icon', paginationIcon)} />
    </li>
  );

  const nextButton = (
    <li
      onClick={next}
      data-testid='pagination-next'
      className={cx('bgm-pagination-next', paginationNav, !hasNext && 'bgm-pagination-next--hide')}
    >
      <VerticalRight className={cx('bgm-pagination-icon', paginationIcon)} />
    </li>
  );

  // pagers
  const pagerList = [];
  const pagerProps = {
    onClick: handleChange,
  };
  const L_PAGE_BUFFER_SIZE = 3;
  const R_PAGE_BUFFER_SIZE = 6;
  const PAGE_BUFFER_SIZE = L_PAGE_BUFFER_SIZE + R_PAGE_BUFFER_SIZE;
  if (allPages <= PAGE_BUFFER_SIZE) {
    for (let i = 1; i <= allPages; i += 1) {
      const active = current === i;
      pagerList.push(<Pager {...pagerProps} key={i} page={i} active={active} />);
    }
  } else {
    let left = Math.max(1, current - L_PAGE_BUFFER_SIZE);
    let right = Math.min(current + R_PAGE_BUFFER_SIZE, allPages);

    if (current - 1 < L_PAGE_BUFFER_SIZE) {
      right = PAGE_BUFFER_SIZE + 1;
    }
    if (allPages - current <= R_PAGE_BUFFER_SIZE) {
      left = allPages - PAGE_BUFFER_SIZE;
    }

    for (let i = left; i <= right; i += 1) {
      const active = current === i;
      pagerList.push(<Pager {...pagerProps} key={i} page={i} active={active} />);
    }
  }
  return (
    <ul className={cx('bgm-pagination', pagination, wrapperClass)} data-testid='pagination-wrapper'>
      {prevButton}
      {pagerList}
      {nextButton}
    </ul>
  );
};

export default Pagination;
