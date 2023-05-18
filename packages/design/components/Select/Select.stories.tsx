import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Select from '.';

const componentMeta: Meta<typeof Select> = {
  title: 'Modern/Select',
  component: Select,
};

export default componentMeta;

export const Template: StoryObj<typeof Select> = {
  render: () => (
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
  ),
};
