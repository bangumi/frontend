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
  /* 子菜单，鼠标悬浮时显示 */
  SubMenu?: JSX.Element
}

const MenuItem: FC<MenuItemProps> = ({ children, onClick, id, className: customClassName, SubMenu }) => {
  const {
    onClick: onClickEmit,
    activeKey,
    mode
  } = useMenuContext()

  const isActive = id === activeKey

  const className = classnames(
    'bgm-menu-item',
    {
      'bgm-menu-item--active': isActive
    },
    `bgm-menu-item--${mode === 'horizontal' ? 'underline' : 'circle'}`,
    customClassName
  )

  return (
    <li
      className={className}
      onClick={onClick ?? (e => onClickEmit?.(id, e))}
    >
      {children}
      {
        SubMenu &&
          <div className="bgm-menu-item__submenu">
            {SubMenu}
          </div>
      }
    </li>
  )
}

export default MenuItem
