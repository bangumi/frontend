import type { FC } from 'react';
import React, { createContext, useContext } from 'react';

import { css, cx } from '@bangumi/styled-system/css';

import type { MenuItemProps } from './MenuItem';
import MenuItem from './MenuItem';

const menu = css({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  margin: '0',
  padding: '0',
  listStyle: 'none',
  color: 'bgmNavText',
  fontStyle: 'normal',
  fontWeight: '700',
  '&.bgm-menu--horizontal': {
    flexDirection: 'row',
    '& > .bgm-menu-item': {
      whiteSpace: 'nowrap',
    },
  },
  '&.bgm-menu--vertical': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    boxSizing: 'border-box',
    lineHeight: '14px',
    /* 下拉/垂直菜单链接不粗体，对齐原站 a.nav */
    fontWeight: '400',
    '& > .bgm-menu-item': {
      width: '100%',
    },
  },
});

export type MenuItemType = Omit<MenuItemProps, 'id'> & { key: string };

export interface MenuProps {
  /** 点击事件，对每一个 MenuItem 都生效 */
  onClick?: (key: string, e: React.MouseEvent<HTMLElement>) => void;
  /** 自定义最外层类名 */
  wrapperClass?: string;
  /** 菜单类型，支持水平、垂直。在 Bangumi 设计中，垂直菜单多用于子菜单 */
  mode?: 'vertical' | 'horizontal';
  /** 最外层节点样式 */
  style?: React.CSSProperties;
  /** 选中节点的 Key */
  activeKey?: string;
  /** 节点数组，设置可以自动设置 MenuItem 节点 */
  items: MenuItemType[];
  /** Render Props, 你可以使用自定义的 Item 组件 */
  children?: (items: MenuItemType) => React.ReactElement;
}

type MenuContextType = Pick<MenuProps, 'onClick' | 'activeKey' | 'mode'>;

const MenuContext = createContext<MenuContextType>({});

const Menu: FC<MenuProps> = ({
  wrapperClass,
  children,
  onClick,
  mode = 'horizontal',
  style,
  activeKey,
  items,
}) => {
  const className = cx('bgm-menu', `bgm-menu--${mode}`, menu, wrapperClass);
  return (
    <ul className={className} style={style}>
      <MenuContext.Provider value={{ onClick, activeKey, mode }}>
        {items.map((item) => {
          if (children) {
            return children(item);
          }
          const { key, ...menuItemProps } = item;
          return <MenuItem key={key} {...menuItemProps} id={key} />;
        })}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;

export const useMenuContext = (): MenuContextType => useContext<MenuContextType>(MenuContext);
