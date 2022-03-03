import React from 'react'
import classnames from 'classnames'

interface ItemProps {
  isActive: boolean
  onClick: () => void
}
const Item: React.FC<ItemProps> = ({ children, isActive, onClick }) => {
  return (
    <li
      className={classnames('tab-item', { active: isActive })}
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

interface TabProps {
  items: ItemType[]
  activeKey: string
  onChange?: (key: string) => void
}

export const Tab: React.FC<TabProps> = ({ activeKey, items, onChange }) => {
  return (
    <ul className="tab">
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
