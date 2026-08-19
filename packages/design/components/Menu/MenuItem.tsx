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
  /* 水平导航项：与原站 #navMenuNeue a.top 对齐的胶囊交互；
     选择器限定直接子链接，避免悬停父项时污染下拉菜单内的链接 */
  '&.bgm-menu-item--pill': {
    '& > .bgm-menu-item__link': {
      padding: '5px 8px',
      lineHeight: '25px',
      borderRadius: '100px',
      transition: 'all .2s ease-in-out',
    },
    '&:hover > .bgm-menu-item__link, &.bgm-menu-item--active > .bgm-menu-item__link': {
      color: 'bgmPrimary',
      textDecoration: 'none',
    },
  },
  /* 垂直导航项（下拉菜单）：与原站 #navMenuNeue li ul li a 对齐 */
  '&.bgm-menu-item--link': {
    '& > .bgm-menu-item__link': {
      margin: '2px 5px',
      padding: '5px 15px',
      borderRadius: '100px',
      color: 'bgmLink',
      textAlign: 'left',
      fontWeight: '400',
      transition: 'all .2s ease-in-out',
      overflow: 'hidden',
    },
    '&:hover > .bgm-menu-item__link': {
      color: '#FFF',
      background: 'bgmBlue',
      textDecoration: 'none',
    },
  },
  /* 下拉菜单容器：与原站 #navMenuNeue li ul 对齐（半透明 + 毛玻璃 + 15px 圆角 + 200px 固定宽）；
     用 visibility/opacity/transform 实现淡入下滑动效（对齐原站移动端面板的 .25s 过渡），
     避免 display 直出造成的生硬闪现 */
  '& .bgm-menu-item__submenu': {
    display: 'block',
    visibility: 'hidden',
    opacity: '0',
    transform: 'translateY(-8px)',
    pointerEvents: 'none',
    transition: 'opacity .2s ease-out, transform .2s ease-out, visibility 0s linear .2s',
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '90',
    width: '200px',
    padding: '5px 0',
    background: 'bgmDropBg',
    borderRadius: '15px',
    boxShadow:
      'inset 0 1px 1px hsla(0, 100%, 100%, 0.3), inset 0 -1px 0 hsla(0, 100%, 100%, .1), 0 3px 15px hsla(214, 100%, 0%, .2)',
    backdropFilter: 'blur(5px)',
  },
  '&:hover .bgm-menu-item__submenu, &:focus-within .bgm-menu-item__submenu': {
    visibility: 'visible',
    opacity: '1',
    transform: 'translateY(0)',
    pointerEvents: 'auto',
    transition: 'opacity .2s ease-out, transform .2s ease-out, visibility 0s',
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
    `bgm-menu-item--${mode === 'horizontal' ? 'pill' : 'link'}`,
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
        <span className='bgm-menu-item__link'>{label}</span>
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
