import React, { FC, MouseEventHandler } from 'react'
import classnames from 'classnames'
import { useMenuContext } from '.'

export interface MenuItemProps {
  /* MenuItem 的唯一标识 */
  id: string,
  /* 覆盖父组件 Menu 的默认 Click 事件, 但大多数情况下应该尽可能使用父组件的 Click 事件 */
  onClick?: MouseEventHandler,
}

const MenuItem: FC<MenuItemProps> = ({ children, onClick, id }) => {
  const { onClick: onClickEmit, activeKey } = useMenuContext()
  return (
    <li
      className={classnames('bgm-menu-item', {
        'bgm-menu-item--active': id === activeKey
      })}
      onClick={onClick || (e => onClickEmit?.(id, e))}
    >
      {children}
    </li>
  )
}

export default MenuItem
