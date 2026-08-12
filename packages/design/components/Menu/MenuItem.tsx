import type { FC, JSX } from 'react';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

import { useMenuContext } from '.';

const menuItem = css({
  cursor: 'pointer',
  fontSize: '1em',
  position: 'relative',
  '& .bgm-menu-item__link': {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
  },
  '&.bgm-menu-item--circle:hover': {
    backgroundColor: '#f09199',
    color: '#fff',
    borderRadius: '17px',
  },
  '&.bgm-menu-item--underline:hover': {
    color: '#f09199',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '12px',
      left: '0',
      right: '0',
      height: '4px',
      backgroundColor: '#f09199',
      borderRadius: '2px',
    },
  },
  '& .bgm-menu-item__submenu': {
    display: 'none',
    position: 'absolute',
    top: '52px',
    border: '1px solid #e8e3e3',
    borderRadius: '17px',
    backgroundColor: '#fff',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  '&:hover .bgm-menu-item__submenu': {
    display: 'block',
  },
});

export interface MenuItemProps {
  /** 唯一标识，不应该直接设置它 */
  id: string;
  /** 菜单标题 */
  label: string;
  /** 菜单项链接 */
  href?: string;
  /** 自定义类名 */
  className?: string;
  /** 子菜单，鼠标悬浮时显示 */
  subMenu?: JSX.Element;
}

const MenuItem: FC<MenuItemProps> = ({ id, label, href, className: customClassName, subMenu }) => {
  const { onClick: onClickEmit, activeKey, mode } = useMenuContext();

  const isActive = id === activeKey;

  const className = cx(
    'bgm-menu-item',
    menuItem,
    isActive && 'bgm-menu-item--active',
    `bgm-menu-item--${mode === 'horizontal' ? 'underline' : 'circle'}`,
    customClassName,
  );

  return (
    <li
      className={className}
      onClick={
        onClickEmit &&
        ((e) => {
          onClickEmit(id, e);
        })
      }
    >
      {href ? (
        <a className='bgm-menu-item__link' href={href}>
          {label}
        </a>
      ) : (
        label
      )}
      {subMenu && (
        <div className='bgm-menu-item__submenu' data-testid='submenu'>
          {subMenu}
        </div>
      )}
    </li>
  );
};

export default MenuItem;
