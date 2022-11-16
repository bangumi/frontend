import React from 'react'
import type { Story } from '@storybook/react'
import Menu, { MenuProps, MenuItemType } from '.'

const items: MenuItemType[] = [
  {
    key: 'animation',
    label: '动画',
  },
  {
    key: 'book',
    label: '书籍',
  },
  {
    key: 'music',
    label: '音乐',
  },
  {
    key: 'game',
    label: '游戏',
  },
  {
    key: 'drama',
    label: '三次元',
  },
]

const itemsVertical: MenuItemType[] = [
  {
    key: 'rank',
    label: '排行榜',
  },
  {
    key: 'calendar',
    label: '每日放送',
  },
  {
    key: 'tag',
    label: '动画标签',
  },
  {
    key: 'browser',
    label: '分类浏览',
  },
  {
    key: 'blog',
    label: '动画日志',
  },
]

export default {
  title: 'modern/Menu',
  component: Menu,
  argTypes: {
    activeKey: {
      control: { type: 'select' },
    },
    items: {
      control: { type: 'array' },
    },
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'white', value: '#fff' },
        { name: 'gray', value: '#e5e5e5' },
      ],
    },
  },
}

/* eslint-disable react/prop-types */
const Template: Story<MenuProps> = ({ items, activeKey, mode, onClick, style, wrapperClass }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Menu
        mode={mode}
        activeKey={activeKey}
        items={items}
        onClick={onClick}
        style={style}
        wrapperClass={wrapperClass}
      />
    </div>
  )
}
/* eslint-enable react/prop-types */

export const Horizontal = Template.bind({})

export const Vertical = Template.bind({})

Horizontal.args = { items, mode: 'horizontal' }
Horizontal.argTypes = {
  activeKey: {
    options: items.map((item) => item.key),
  },
}

Vertical.args = { items: itemsVertical, mode: 'vertical' }
Vertical.argTypes = {
  activeKey: {
    options: itemsVertical.map((item) => item.key),
  },
  style: {
    defaultValue: {
      fontSize: 12,
      fontWeight: 400,
    },
  },
}
