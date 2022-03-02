import React from 'react'
import type { Story } from '@storybook/react'
import Menu, { MenuItem, MenuProps } from '.'

type IItems = MenuProps['items']

const items: IItems = [{
  key: 'all',
  label: '全部条目'
}, {
  key: 'animation',
  label: '动画'
}, {
  key: 'book',
  label: '书籍'
}, {
  key: 'music',
  label: '音乐'
}, {
  key: 'game',
  label: '游戏'
}, {
  key: 'drama',
  label: '三次元'
}]

const itemsVertical: IItems = [{
  key: 'rank',
  label: '排行榜'
},
{
  key: 'calendar',
  label: '每日放送'
}, {
  key: 'tag',
  label: '动画标签'
}, {
  key: 'browser',
  label: '分类浏览'
}, {
  key: 'blog',
  label: '动画日志'
}]

export default {
  title: 'modern/Menu',
  component: Menu,
  subcomponents: {
    MenuItem
  },
  argTypes: {
    activeKey: {
      control: { type: 'select' }
    },
    items: {
      control: { type: 'array' }
    },
    onClick: { action: 'clicked' }
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'white', value: '#fff' },
        { name: 'gray', value: '#e5e5e5' }
      ]
    }
  }
}

type TArgs = { items: IItems, itemsVertical: IItems, activeKey: string, mode: MenuProps['mode'], onClick: MenuProps['onClick'] }

// eslint-disable-next-line react/prop-types
const Template: Story<TArgs> = ({ items, activeKey, mode, onClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Menu
        mode={mode}
        activeKey={activeKey}
        items={items}
        onClick={onClick}
      />
    </div>
  )
}

export const Horizontal = Template.bind({})

export const Vertical = Template.bind({})

Horizontal.args = { items, mode: 'horizontal' }
Horizontal.argTypes = {
  activeKey: {
    options: items.map(item => item.key)
  }
}

Vertical.args = ({ items: itemsVertical, mode: 'vertical' })
Vertical.argTypes = {
  activeKey: {
    options: itemsVertical.map(item => item.key)
  }
}
