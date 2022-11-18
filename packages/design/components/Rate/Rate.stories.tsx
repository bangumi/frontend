import type { ComponentStory } from '@storybook/react';
import React from 'react';

import Rate from '.';

export default {
  title: 'modern/Rate',
  component: Rate,
  argTypes: {
    value: {
      name: 'value',
      type: { name: 'number', required: true },
    },
  },
};

const Template: ComponentStory<typeof Rate> = (args) => {
  return <Rate {...args} />;
};

export const UsedAsRateIndicate = Template.bind({});
UsedAsRateIndicate.args = {
  value: 5,
};
