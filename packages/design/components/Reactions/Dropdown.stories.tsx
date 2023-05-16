import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import type { ReactionsDropdownProps } from './Dropdown';
import ReactionsDropdown from './Dropdown';

const storyMeta: Meta<typeof ReactionsDropdown> = {
  title: 'modern/Reactions/Dropdown',
  component: ReactionsDropdown,
};

export default storyMeta;

const Template: StoryFn<ReactionsDropdownProps> = (args) => {
  return (
    <div style={{ paddingLeft: 100 }}>
      <ReactionsDropdown {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithText = Template.bind({});
WithText.args = { showText: true };
