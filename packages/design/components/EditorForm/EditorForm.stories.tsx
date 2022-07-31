import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import EditorForm from '.'

const componentMeta: ComponentMeta<typeof EditorForm> = {
  title: 'Modern/EditorForm',
  component: EditorForm
}

export default componentMeta

const Template: ComponentStory<typeof EditorForm> = (args) => {
  return <EditorForm {...args} />
}

export const Usage = Template.bind({})

Usage.args = {
  placeholder: '请输入内容'
}
