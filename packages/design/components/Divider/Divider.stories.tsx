import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Divider from '.'

export default {
  title: 'Grid/Divider',
  component: Divider
} as ComponentMeta<typeof Divider>

const Template: ComponentStory<typeof Divider> = (args) => <Divider {...args} />

export const Horizontal = Template.bind({})
Horizontal.args = {
  orientation: 'horizontal',
  isListItem: false
}

export const Vertical = Template.bind({})
Vertical.args = {
  orientation: 'vertical',
  isListItem: false
}
