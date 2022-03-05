import React, { FC, MouseEventHandler } from 'react'
import classnames from 'classnames'
import { useMenuContext } from '.'

export interface MenuItemProps {
  /* MenuItem 的唯一标识 */
  id: string
  /* 自定义类名，大多数情况下应该尽可能为父组件设置样式 */
  className?: string
  /* 覆盖父组件 Menu 的默认 Click 事件, 但大多数情况下应该尽可能使用父组件的 Click 事件 */
  onClick?: MouseEventHandler
}

const MenuItem: FC<MenuItemProps> = ({ children, onClick, id, className }) => {
  const { onClick: onClickEmit, activeKey, activeType } = useMenuContext()
  const isActive = id === activeKey
  return (
    <li
      className={classnames('bgm-menu-item', {
        'bgm-menu-item--active': isActive,
        circle: isActive && activeType === 'circle',
        underline: isActive && activeType === 'underline'
      }, className)}
      onClick={onClick ?? (e => onClickEmit?.(id, e))}
    >
      {children}
    </li>
  )
}

export default MenuItem
