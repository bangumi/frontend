import type { Meta, StoryFn } from '@storybook/react';
import type { FC } from 'react';
import React, { useState } from 'react';

import Editor from './Editor.tsx';
import EditorForm from './index.tsx';
import Toolbox from './Toolbox.tsx';

const componentMeta: Meta<typeof EditorForm> = {
  title: 'Modern/EditorForm',
  component: EditorForm,
  subcomponents: {
    Toolbox,
    Editor,
  } as Record<string, FC<unknown>>,
};

export default componentMeta;

const Template: StoryFn<typeof EditorForm> = (args) => {
  const [value, setValue] = useState(args.value);
  return <EditorForm {...args} value={value} onChange={setValue} />;
};

export const Usage = Template.bind({});

Usage.args = {
  placeholder: '请输入内容',
};
