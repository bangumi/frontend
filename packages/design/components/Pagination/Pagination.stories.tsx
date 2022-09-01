import React from 'react'
import Pagination from '.'
import { ComponentStory, ComponentMeta } from '@storybook/react'

const componentMeta: ComponentMeta<typeof Pagination> = {
  title: 'modern/Pagination',
  component: Pagination
}

export default componentMeta

const Template: ComponentStory<typeof Pagination> = (args) => {
  return <Pagination {...args} />
}

export const Usage = Template.bind({})
Usage.args = {
  total: 3000,
  currentOffset: 20
}
