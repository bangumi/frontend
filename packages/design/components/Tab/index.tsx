import './style';

import classnames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

type Key = string | number;
interface ItemProps {
  isActive: boolean;
  type: 'default' | 'borderless';
  onClick: () => void;
}
const Item: React.FC<PropsWithChildren<ItemProps>> = ({ children, isActive, onClick, type }) => {
  return (
    <li
      className={classnames('bgm-tab__item', `bgm-tab__item--${type}`, {
        'bgm-tab__item--active': isActive,
      })}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

interface ItemType {
  key: Key;
  label: string;
}

export interface TabProps<T extends ItemType = ItemType> {
  /** 节点数组 */
  items: T[];
  /* 选中节点的 Key */
  activeKey: Key;
  /* 点击切换事件回调，对每一个 Item 都生效 */
  onChange?: (key: Key, value: T) => void;
  /* 样式类型 */
  type?: 'default' | 'borderless';
}

export const Tab = <T extends ItemType>({
  activeKey,
  items,
  onChange,
  type = 'default',
}: TabProps<T>) => {
  return (
    <ul className={classnames('bgm-tab', `bgm-tab--${type}`)}>
      {items.map((item) => {
        return (
          <Item
            key={item.key}
            isActive={activeKey === item.key}
            type={type}
            onClick={() => {
              onChange?.(item.key, item);
            }}
          >
            {' '}
            {item.label}
          </Item>
        );
      })}
    </ul>
  );
};

export default Tab;
