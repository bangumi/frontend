import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import type { ReactionsDropdownProps } from '.';
import ReactionsDropdown from '.';

const storyMeta: Meta<typeof ReactionsDropdown> = {
  title: 'modern/ReactionsDropdown',
  component: ReactionsDropdown,
};

export default storyMeta;

const Template: StoryFn<ReactionsDropdownProps> = (args) => {
  return <ReactionsDropdown {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
