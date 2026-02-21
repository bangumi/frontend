import './style';

import classnames from 'classnames';
import type { JSX, PropsWithChildren } from 'react';
import React, { createContext, useContext } from 'react';

type StyleType = 'default' | 'borderless';

interface ItemType {
  key: React.Key;
  label: string;
}

type ItemProps = JSX.IntrinsicElements['li'] & {
  isActive: boolean;
};

type GroupProps = PropsWithChildren<{
  type?: StyleType;
}>;

export interface TabProps<T extends ItemType = ItemType> {
  /** 节点数组 */
  items: T[];
  /* 选中节点的 Key */
  activeKey: React.Key;
  /* 点击切换事件回调，对每一个 Item 都生效 */
  onChange?: (key: React.Key, value: T) => void;
  /* 样式类型 */
  type?: StyleType;
}

const TabContext = createContext<{ type: StyleType }>({ type: 'default' });

const TabItem: React.FC<ItemProps> = ({ isActive, ...props }) => {
  const { type } = useContext(TabContext);
  return (
    <li
      className={classnames('bgm-tab__item', `bgm-tab__item--${type}`, {
        'bgm-tab__item--active': isActive,
      })}
      {...props}
    />
  );
};

function TabGroup({ children, type = 'default' }: GroupProps) {
  return (
    <TabContext.Provider value={{ type }}>
      <ul className={classnames('bgm-tab', `bgm-tab--${type}`)}>{children}</ul>
    </TabContext.Provider>
  );
}

const Tab = <T extends ItemType>({ activeKey, items, onChange, type = 'default' }: TabProps<T>) => (
  <TabGroup type={type}>
    {items.map((item) => (
      <TabItem
        key={item.key}
        isActive={activeKey === item.key}
        onClick={() => {
          onChange?.(item.key, item);
        }}
      >
        {item.label}
      </TabItem>
    ))}
  </TabGroup>
);

Tab.Group = TabGroup;
Tab.Item = TabItem;

export default Tab;
