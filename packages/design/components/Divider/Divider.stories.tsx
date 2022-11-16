import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Divider from '.'

const componentMeta: ComponentMeta<typeof Divider> = {
  title: 'Grid/Divider',
  component: Divider,
  decorators: [
    (story) => <div style={{ width: '15vw', height: '15vh' }}>{story()}</div>,
  ],
}

export default componentMeta

const Template: ComponentStory<typeof Divider> = (args) => {
  const isListItem = args.isListItem
  const orientation = args.orientation

  if (isListItem) {
    return (
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'row' : 'column',
        }}
      >
        <li>想看</li>
        <Divider {...args} />
        <li>看过</li>
      </ul>
    )
  } else {
    return (
      <div style={{ display: orientation === 'vertical' ? 'flex' : undefined }}>
        <span>标题</span>
        <Divider {...args} />
        <span>文本</span>
      </div>
    )
  }
}

export const Horizontal = Template.bind({})
Horizontal.args = {
  orientation: 'horizontal',
  isListItem: false,
}

export const Vertical = Template.bind({})
Vertical.args = {
  orientation: 'vertical',
  isListItem: false,
}
