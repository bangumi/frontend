import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Select from '.';

const componentMeta: ComponentMeta<typeof Select> = {
  title: 'Modern/Select',
  component: Select,
};

export default componentMeta;

const Template: ComponentStory<typeof Select> = () => {
  return (
    <Select
      style={{
        width: 400,
      }}
      options={[
        { label: '名字', value: 'name' },
        { label: '年龄', value: 'age' },
        { label: '学校', value: 'school' },
      ]}
      defaultValue='age'
    />
  );
};

export const Default = Template.bind({});
