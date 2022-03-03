import React from 'react'
import { ComponentStory } from '@storybook/react'
import Rate from '.'

export default {
  title: 'modern/Rate',
  component: Rate,
  argTypes: {
    value: {
      name: 'value',
      type: { name: 'number', required: true }
    }
  }
}

const Template: ComponentStory<typeof Rate> = (args) => {
  return <Rate {...args}></Rate>
}

export const UsedAsRateIndicate = Template.bind({})
UsedAsRateIndicate.args = {
  value: 5
}
