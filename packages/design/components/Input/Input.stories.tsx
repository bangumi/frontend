import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import Input, { InputProps } from '.'
import { UserLogin } from '@bangumi/icons'

const componentMeta: ComponentMeta<typeof Input> = {
  title: 'modern/Input',
  component: Input
}

export default componentMeta

// eslint-disable-next-line react/prop-types
const Template: Story<InputProps> = ({ placeholder, type, prefix, suffix }) => {
  return (
    <Input placeholder={placeholder} type={type} prefix={prefix} suffix={suffix} />
  )
}

export const Default = Template.bind({})

export const Login = Template.bind({})

Login.args = {
  placeholder: '你的 Email 地址',
  type: 'email',
  prefix: <UserLogin />
}

export const Password = Template.bind({})

Password.args = {
  placeholder: '您的密码',
  type: 'password'
}

export const Search = Template.bind({})
