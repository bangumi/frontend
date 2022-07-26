import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Editor from '.'

const componentMeta: ComponentMeta<typeof Editor> = {
  title: 'Modern/Editor',
  component: Editor
}

export default componentMeta

const Template: ComponentStory<typeof Editor> = (args) => {
  return <Editor {...args} />
}

export const Usage = Template.bind({})
