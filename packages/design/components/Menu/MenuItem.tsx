import React, { FC } from 'react'
import classnames from 'classnames'
import { useMenuContext } from '.'

export interface MenuItemProps {
  /* MenuItem 的唯一标识 */
  id: string
  /* 菜单标题 */
  label: string
  /* 自定义类名 */
  className?: string
  /* 子菜单，鼠标悬浮时显示 */
  SubMenu?: JSX.Element
}

const MenuItem: FC<MenuItemProps> = ({ id, label, className: customClassName, SubMenu }) => {
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
      onClick={e => onClickEmit?.(id, e)}
    >
      {label}
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
