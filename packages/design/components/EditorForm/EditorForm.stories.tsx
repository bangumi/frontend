import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EditorForm from '.';
import Toolbox from './Toolbox';
import Editor from './Editor';

const componentMeta: ComponentMeta<typeof EditorForm> = {
  title: 'Modern/EditorForm',
  component: EditorForm,
  subcomponents: {
    Toolbox,
    Editor,
  },
};

export default componentMeta;

const Template: ComponentStory<typeof EditorForm> = (args) => {
  return <EditorForm {...args} />;
};

export const Usage = Template.bind({});

Usage.args = {
  placeholder: '请输入内容',
};
