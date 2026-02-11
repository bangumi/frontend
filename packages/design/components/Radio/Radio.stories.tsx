import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import Radio from '.';

const componentMeta: Meta<typeof Radio> = {
  title: 'Modern/Radio',
  component: Radio,
};
export default componentMeta;
const Template: StoryFn<typeof Radio> = () => {
  return (
    <>
      <Radio id='beginner' label='入门模式' name='type' />
      <Radio id='wiki' label='Wiki模式' name='type' />
    </>
  );
};
export const Default = Template.bind({});

const GroupTemplate = () => (
  <Radio.Group>
    <Radio id='beginner' label='入门模式' name='type' />
    <Radio id='wiki' label='Wiki模式' name='type' />
  </Radio.Group>
);

export const RadioGroup = GroupTemplate.bind({});
