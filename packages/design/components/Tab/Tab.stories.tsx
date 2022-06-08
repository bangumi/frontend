import React from 'react'
import Tab from '.'
import type { Story } from '@storybook/react'

export default {
  title: 'modern/Tab',
  component: Tab,
  argTypes: {
    activeKey: {
      options: ['all', 'animation', 'book', 'music', 'game', 'drama'],
      control: { type: 'select' }
    },
    items: {
      control: { type: 'object' }
    }
  }
}

// eslint-disable-next-line react/prop-types
const Template: Story<{ activeKey: string }> = ({ activeKey }) => {
  const items = [{
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
  return (
    <Tab items={items} activeKey={activeKey} />
  )
}

export const Usage = Template.bind({})
