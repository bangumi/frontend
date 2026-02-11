import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Pagination from '.';

const componentMeta: Meta<typeof Pagination> = {
  title: 'modern/Pagination',
  component: Pagination,
};

export default componentMeta;

const Template: StoryFn<typeof Pagination> = (args) => {
  return <Pagination {...args} />;
};

export const Usage = Template.bind({});
Usage.args = {
  total: 3000,
  currentPage: 20,
};
