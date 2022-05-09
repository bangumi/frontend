import React from 'react'
import classnames from 'classnames'

interface ItemProps {
  isActive: boolean
  onClick: () => void
}
const Item: React.FC<ItemProps> = ({ children, isActive, onClick }) => {
  return (
    <li
      className={classnames('bgm-tab__item', { 'bgm-tab__item--active': isActive })}
      onClick={onClick}
    >
      {children}
    </li>
  )
}

interface ItemType {
  key: string
  label: string
}

export interface TabProps {
  /* 节点数组 */
  items: ItemType[]
  /* 选中节点的 Key */
  activeKey: string
  /* 点击切换事件回调，对每一个 Item 都生效 */
  onChange?: (key: string) => void
}

export const Tab: React.FC<TabProps> = ({ activeKey, items, onChange }) => {
  return (
    <ul className="bgm-tab">
      {
      items.map((item) => {
        return (
          <Item
            key={item.key}
            isActive={activeKey === item.key}
            onClick={() => { onChange?.(item.key) }}
          > {item.label}
          </Item>
        )
      })
    }
    </ul>
  )
}

export default Tab
