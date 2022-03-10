import React, { FC, createContext, useContext } from 'react'
import MenuItem from './MenuItem'
import classnames from 'classnames'

interface IItem {
  key: string
  label: string
}

export interface MenuProps {
  /* 点击事件，对每一个 MenuItem 都生效 */
  onClick?: (key: string, e: React.MouseEvent<HTMLElement>) => void
  /* 自定义类名 */
  className?: string
  /* 菜单类型，支持水平、垂直 */
  mode?: 'vertical' | 'horizontal'
  /* 最外层节点样式 */
  style?: React.CSSProperties
  /* 选中节点的 Key */
  activeKey?: string
  /* 节点数组，设置可以自动设置 MenuItem 节点，如果有其它特殊需求也可以手动添加到 children/slots */
  items?: IItem[]
  /* 选中时的样式 */
  activeType?: 'circle' | 'underline' | 'none'
  /* Render Props, 你可以使用自定义的 Item 组件 */
  children?: (items: IItem) => React.ReactElement
}

type MenuContextType = Pick<MenuProps, 'onClick' | 'activeKey' | 'activeType'>

const MenuContext = createContext<MenuContextType>({})

const Menu: FC<MenuProps> = ({
  className: customClassName,
  children,
  onClick,
  mode,
  style,
  activeKey,
  activeType,
  items
}) => {
  const className = classnames('bgm-menu', customClassName, {
    'bgm-menu--vertical': mode === 'vertical',
    'bgm-menu--horizontal': mode === 'horizontal'
  })

  return (
    <ul className={className} style={style}>
      <MenuContext.Provider value={{ onClick, activeKey, activeType }}>
        {
          items?.map(item => {
            return children
              ? children(item)
              : (
                <MenuItem key={item.key} id={item.key}>{item.label}</MenuItem>
                )
          })
        }
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  activeType: 'none'
}

export default Menu

export const useMenuContext = (): MenuContextType => useContext<MenuContextType>(MenuContext)

export { default as MenuItem } from './MenuItem'
export type { MenuItemProps } from './MenuItem'
