import type { ComponentStory } from '@storybook/react';
import React from 'react';

import RichContent from '.';

const input = `
又名：CUP人生茶话会

1.上班的时候想要回家的。
2.学校课上打瞌睡的。(bgm38)
3.学校课上打瞌睡的。(bgm11)
4.学校课上打瞌睡的。(bgm12)
5.上班打瞌睡的。(bgm23)
6.回家打瞌睡的。(bgm13)

`;

export default {
  title: 'modern/RichContent',
  component: RichContent,
};

const Template: ComponentStory<typeof RichContent> = (args) => {
  return <RichContent {...args} />;
};

export const Usage = Template.bind({});
Usage.args = {
  bbcode: input,
};
