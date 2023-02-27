import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ErrorMessage from '.';

const componentMeta: ComponentMeta<typeof ErrorMessage> = {
  title: 'modern/ErrorMessage',
  component: ErrorMessage,
  args: {
    message: '这是一条错误提示',
    length: 'auto',
  },
  decorators: [
    (story) => (
      <div
        style={{
          width: '500px',
          height: '200px',
        }}
      >
        {story()}
      </div>
    ),
  ],
};
export default componentMeta;

const Template: ComponentStory<typeof ErrorMessage> = (args) => {
  return <ErrorMessage {...args} />;
};

export const Usage = Template.bind({});
