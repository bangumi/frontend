import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Radio from '.';

const componentMeta: ComponentMeta<typeof Radio> = {
  title: 'Modern/Radio',
  component: Radio,
};
export default componentMeta;
const Template: ComponentStory<typeof Radio> = () => {
  return (
    <>
      <Radio id='beginner' label='入门模式' name='type' />
      <Radio id='wiki' label='Wiki模式' name='type' />
    </>
  );
};
export const Default = Template.bind({});
