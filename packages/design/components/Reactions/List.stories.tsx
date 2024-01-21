import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import type { ReactionsListProps } from './List';
import ReactionsList from './List';

const storyMeta: Meta<typeof ReactionsList> = {
  title: 'modern/Reactions/List',
  component: ReactionsList,
};

export default storyMeta;

const Template: StoryFn<ReactionsListProps> = (args) => {
  return <ReactionsList {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  reactions: [
    { selected: false, total: 233, value: 54 },
    { selected: false, total: 1, value: 0 },
  ],
};
