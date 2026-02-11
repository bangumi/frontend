import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Avatar from '.';

const componentMeta: Meta<typeof Avatar> = {
  title: 'modern/Avatar',
  component: Avatar,
  args: {
    src: 'https://lain.bgm.tv/pic/user/l/icon.jpg',
    size: 'small',
  },
};
export default componentMeta;

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const Usage = Template.bind({});
