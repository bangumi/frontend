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
const Template: Story<InputProps> = ({ placeholder, type, prefix, suffix, wrapperClass, wrapperStyle }) => {
  return (
    <Input
      placeholder={placeholder}
      type={type}
      prefix={prefix}
      suffix={suffix}
      wrapperClass={wrapperClass}
      wrapperStyle={wrapperStyle}
    />
  )
}

export const Default = Template.bind({})

const loginStyle = {
  width: 320,
  height: 38
}

export const Login = Template.bind({})

Login.args = {
  placeholder: '你的 Email 地址',
  type: 'email',
  prefix: <UserLogin style={{ marginRight: 12.5 }} />,
  wrapperStyle: loginStyle
}

export const Password = Template.bind({})

Password.args = {
  placeholder: '您的密码',
  type: 'password',
  wrapperStyle: loginStyle
}

export const Search = Template.bind({})
