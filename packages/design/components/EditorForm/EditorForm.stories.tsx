import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useState } from 'react';

import EditorForm from '.';
import Editor from './Editor';
import Toolbox from './Toolbox';

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
  const [content, setContent] = useState(args.content);
  return <EditorForm {...args} content={content} onChange={setContent} />;
};

export const Usage = Template.bind({});

Usage.args = {
  placeholder: '请输入内容',
};
