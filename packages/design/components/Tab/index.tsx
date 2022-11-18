import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

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
  key: string;
  label: string;
}

export interface TabProps {
  /* 节点数组 */
  items: ItemType[];
  /* 选中节点的 Key */
  activeKey: string;
  /* 点击切换事件回调，对每一个 Item 都生效 */
  onChange?: (key: string) => void;
  /* 样式类型 */
  type?: 'default' | 'borderless';
}

export const Tab: React.FC<TabProps> = ({ activeKey, items, onChange, type = 'default' }) => {
  return (
    <ul className={classnames('bgm-tab', `bgm-tab--${type}`)}>
      {items.map((item) => {
        return (
          <Item
            key={item.key}
            isActive={activeKey === item.key}
            type={type}
            onClick={() => {
              onChange?.(item.key);
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
