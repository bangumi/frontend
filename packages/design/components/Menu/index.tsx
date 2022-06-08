import React, { FC, createContext, useContext } from 'react'
import MenuItem, { MenuItemProps } from './MenuItem'
import classnames from 'classnames'

export type MenuItemType = Omit<MenuItemProps, 'id'> & { key: string }

export interface MenuProps {
  /* 点击事件，对每一个 MenuItem 都生效 */
  onClick?: (key: string, e: React.MouseEvent<HTMLElement>) => void
  /* 自定义最外层类名 */
  wrapperClass?: string
  /* 菜单类型，支持水平、垂直。在 Bangumi 设计中，垂直菜单多用于子菜单 */
  mode?: 'vertical' | 'horizontal'
  /* 最外层节点样式 */
  style?: React.CSSProperties
  /* 选中节点的 Key */
  activeKey?: string
  /* 节点数组，设置可以自动设置 MenuItem 节点 */
  items: MenuItemType[]
  /* Render Props, 你可以使用自定义的 Item 组件 */
  children?: (items: MenuItemType) => React.ReactElement
}

type MenuContextType = Pick<MenuProps, 'onClick' | 'activeKey' | 'mode'>

const MenuContext = createContext<MenuContextType>({})

const Menu: FC<MenuProps> = ({
  wrapperClass,
  children,
  onClick,
  mode = 'horizontal',
  style,
  activeKey,
  items
}) => {
  const className = classnames(
    'bgm-menu',
    `bgm-menu--${mode}`,
    wrapperClass
  )
  return (
    <ul className={className} style={style}>
      <MenuContext.Provider value={{ onClick, activeKey, mode }}>
        {
          items.map(item => {
            return children
              ? children(item)
              : (
                <MenuItem {...item} id={item.key} />
                )
          })
        }
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu

export const useMenuContext = (): MenuContextType => useContext<MenuContextType>(MenuContext)
