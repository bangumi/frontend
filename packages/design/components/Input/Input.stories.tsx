import type { ComponentMeta, Story } from '@storybook/react';
import React from 'react';

import { Search as SearchIcon, UserLogin } from '@bangumi/icons';

import Select from '../Select';
import type { InputGroupProps, InputProps } from '.';
import Input from '.';

const componentMeta: ComponentMeta<typeof Input> = {
  title: 'modern/Input',
  component: Input,
  subcomponents: { 'Input.Group': Input.Group },
};

export default componentMeta;

const Template: Story<InputProps & React.RefAttributes<HTMLInputElement>> = (args) => {
  return <Input {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  placeholder: '你的 Email 地址',
};

const loginStyle = {
  width: 320,
};

export const IconPrefix = Template.bind({});

IconPrefix.args = {
  placeholder: '你的 Email 地址',
  type: 'email',
  prefix: <UserLogin />,
  wrapperStyle: loginStyle,
};

export const Password = Template.bind({});

Password.args = {
  placeholder: '您的密码',
  type: 'password',
  wrapperStyle: loginStyle,
};

export const NavSearch = Template.bind({});

NavSearch.args = {
  // 正式需要详细样式
  prefix: (
    <select
      name='select'
      style={{ outline: 'none', border: 'none', color: '#AAA6A6' }}
      defaultValue='value1'
    >
      <option value='value1'>全部条目</option>
    </select>
  ),
  suffix: <SearchIcon style={{ flexShrink: 0 }} />,
  wrapperStyle: {
    width: 256,
    height: 32,
    padding: '3px 12px 5px 13px',
  },
};

export const Rounded = Template.bind({});
Rounded.args = {
  placeholder: '取个标题…',
  rounded: true,
};

const InputGroupTemplate = (args: InputGroupProps) => {
  return (
    <Input.Group {...args}>
      <Select options={[{ label: '你好', value: '你好' }]} defaultValue='你好' />
      <Input />
      <Input />
      <Input rounded />
    </Input.Group>
  );
};

export const InputGroup = InputGroupTemplate.bind({});
