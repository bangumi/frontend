import type { Meta, StoryFn } from '@storybook/react';
import React, { type FC, useState } from 'react';

import EditorForm from '.';
import Editor from './Editor';
import Toolbox from './Toolbox';

const componentMeta: Meta<typeof EditorForm> = {
  title: 'Modern/EditorForm',
  component: EditorForm,
  subcomponents: {
    Toolbox: Toolbox as FC<unknown>,
    Editor: Editor as FC<unknown>,
  },
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
