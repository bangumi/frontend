import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Avatar from '.';

const componentMeta: ComponentMeta<typeof Avatar> = {
  title: 'modern/Avatar',
  component: Avatar,
  args: {
    src: 'https://lain.bgm.tv/pic/user/l/000/00/00/1.jpg',
    size: 'small',
  },
};
export default componentMeta;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Usage = Template.bind({});
