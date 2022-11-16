import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import Input, { InputProps } from '.'
import { UserLogin, Search as SearchIcon } from '@bangumi/icons'

const componentMeta: ComponentMeta<typeof Input> = {
  title: 'modern/Input',
  component: Input,
}

export default componentMeta

/* eslint-disable react/prop-types */
const Template: Story<InputProps> = ({
  placeholder,
  type,
  prefix,
  suffix,
  wrapperClass,
  wrapperStyle,
}) => {
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
/* eslint-enable react/prop-types */

export const Default = Template.bind({})

const loginStyle = {
  width: 320,
  height: 38,
}

export const Login = Template.bind({})

Login.args = {
  placeholder: '你的 Email 地址',
  type: 'email',
  prefix: <UserLogin style={{ marginRight: 12.5 }} />,
  wrapperStyle: loginStyle,
}

export const Password = Template.bind({})

Password.args = {
  placeholder: '您的密码',
  type: 'password',
  wrapperStyle: loginStyle,
}

export const NavSearch = Template.bind({})

NavSearch.args = {
  // 正式需要详细样式
  prefix: (
    <select
      name="select"
      style={{
        outline: 'none',
        border: 'none',
        color: '#AAA6A6',
      }}
    >
      <option value="value1" selected>
        全部条目
      </option>
    </select>
  ),
  suffix: <SearchIcon style={{ flexShrink: 0 }} />,
  wrapperStyle: {
    width: 256,
    height: 32,
    padding: '3px 12px 5px 13px',
  },
}
