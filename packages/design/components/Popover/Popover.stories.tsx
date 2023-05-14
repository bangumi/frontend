import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Button from '../Button';
import type { PopoverProps } from '.';
import Popover from '.';

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
