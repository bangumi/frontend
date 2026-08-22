import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Button from '@bangumi/design/components/Button/index.tsx';

import type { PopoverProps } from './index.tsx';
import Popover from './index.tsx';

const storyMeta: Meta<typeof Popover> = {
  title: 'modern/Popover',
  component: Popover,
};

export default storyMeta;

const Template: StoryFn<PopoverProps> = (args) => {
  return <Popover {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  content: <div style={{ padding: 30 }}>Popover content</div>,
  children: <Button>Popover</Button>,
};
