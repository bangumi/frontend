import React, { FC } from 'react'
import classNames from 'classnames'

export interface PagerProps {
  page: number
  active: boolean
  onClick: (p: number) => void
}

const Pager: FC<PagerProps> = (props) => {
  const prefixCls = 'bgm-pagination-pager'
  const actualClassnames = classNames(prefixCls, `${prefixCls}--${props.page}`, {
    [`${prefixCls}--active`]: props.active,
    [`${prefixCls}--disabled`]: !props.page
  })

  const handleClick = (): void => {
    props.onClick(props.page)
  }

  return (
    <li
      data-testid="pagination-pager"
      title={`${props.page}`}
      className={actualClassnames}
      onClick={handleClick}
      tabIndex={0}
    >
      <a rel="nofollow">{props.page}</a>
    </li>
  )
}

export default Pager
