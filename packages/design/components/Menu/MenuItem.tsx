import classnames from 'classnames';
import type { FC } from 'react';
import React from 'react';

import { useMenuContext } from '.';

export interface MenuItemProps {
  /** 唯一标识，不应该直接设置它 */
  id: string;
  /** 菜单标题 */
  label: string;
  /** 自定义类名 */
  className?: string;
  /** 子菜单，鼠标悬浮时显示 */
  subMenu?: JSX.Element;
}

const MenuItem: FC<MenuItemProps> = ({ id, label, className: customClassName, subMenu }) => {
  const { onClick: onClickEmit, activeKey, mode } = useMenuContext();

  const isActive = id === activeKey;

  const className = classnames(
    'bgm-menu-item',
    {
      'bgm-menu-item--active': isActive,
    },
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
      {label}
      {subMenu && (
        <div className='bgm-menu-item__submenu' data-testid='submenu'>
          {subMenu}
        </div>
      )}
    </li>
  );
};

export default MenuItem;
