import React, { FC, useState } from 'react'
import Pager from './Pager'
import { VerticalLeft, VerticalRight } from '@bangumi/icons'

export interface PaginationProps {
  /* 当前页码 */
  current?: number
  /* 默认页码 */
  defaultCurrent?: number
  /* 单页的数据条数 */
  pageSize?: number
  /* 默认单页的数据条数 */
  defaultPageSize?: number
  /* 数据的总条数 */
  total?: number
  /* 页码改变的回调 */
  onChange?: (page: number) => void
}

function calculatePage (pageSize: number, total: number): number {
  return Math.floor((total - 1) / pageSize) + 1
}

const Pagination: FC<PaginationProps> = ({
  defaultCurrent = 1,
  defaultPageSize = 30,
  total = 0,
  ...restProps
}) => {
  const [current, setCurrent] = useState(() => restProps.current ?? defaultCurrent)
  const pageSize = restProps.pageSize ?? defaultPageSize

  // 不需要分页的时候不渲染
  if (total < pageSize) {
    return null
  }

  const allPages = calculatePage(pageSize, total)
  const handleChange = (page: number): void => {
    setCurrent(page)
    restProps.onChange?.(page)
  }

  // prev, next
  const hasPrev = current > 1
  const prev = (): void => {
    if (hasPrev) {
      handleChange(current - 1)
    }
  }
  const hasNext = current < allPages
  const next = (): void => {
    if (hasNext) {
      handleChange(current + 1)
    }
  }

  const prevButton = (
    <li
      onClick={prev}
      data-testid="pagination-prev"
      className="bgm-pagination-prev"
    >
      <VerticalLeft className="bgm-pagination-icon" />
    </li>
  )

  const nextButton = (
    <li
      onClick={next}
      data-testid="pagination-next"
      className="bgm-pagination-next"
    >
      <VerticalRight className="bgm-pagination-icon" />
    </li>
  )

  // pagers
  const pagerList = []
  const pagerProps = {
    onClick: handleChange
  }
  const L_PAGE_BUFFER_SIZE = 3
  const R_PAGE_BUFFER_SIZE = 6
  const PAGE_BUFFER_SIZE = L_PAGE_BUFFER_SIZE + R_PAGE_BUFFER_SIZE
  if (allPages <= PAGE_BUFFER_SIZE) {
    for (let i = 1; i <= allPages; i += 1) {
      const active = current === i
      pagerList.push(
        <Pager {...pagerProps} key={i} page={i} active={active} />
      )
    }
  } else {
    let left = Math.max(1, current - L_PAGE_BUFFER_SIZE)
    let right = Math.min(current + R_PAGE_BUFFER_SIZE, allPages)

    if (current - 1 < L_PAGE_BUFFER_SIZE) {
      right = PAGE_BUFFER_SIZE + 1
    }
    if (allPages - current <= R_PAGE_BUFFER_SIZE) {
      left = allPages - PAGE_BUFFER_SIZE
    }

    for (let i = left; i <= right; i += 1) {
      const active = current === i
      pagerList.push(
        <Pager {...pagerProps} key={i} page={i} active={active} />
      )
    }
  }
  return (
    <ul className="bgm-pagination" data-testid="pagination-wrapper">
      {hasPrev && prevButton}
      {pagerList}
      {hasNext && nextButton}
    </ul>
  )
}

export default Pagination
