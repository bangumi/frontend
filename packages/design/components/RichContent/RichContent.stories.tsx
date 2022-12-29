import type { ComponentStory } from '@storybook/react';
import React from 'react';

import { render } from '@bangumi/utils';

import RichContent from '.';

export default {
  title: 'modern/RichContent',
  component: RichContent,
};

const demoText = render(`
又名：CUP人生茶话会

1.上班的时候想要回家的。
2.学校课上打瞌睡的。(bgm38)
2.学校课上打瞌睡的。(bgm11)
2.学校课上打瞌睡的。(bgm12)


`);

export const Demo: ComponentStory<typeof RichContent> = () => {
  return <RichContent element={demoText} />;
};
