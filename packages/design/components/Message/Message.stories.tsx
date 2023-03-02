import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Message from '.';

const componentMeta: ComponentMeta<typeof Message> = {
  title: 'modern/Message',
  component: Message,
  argTypes: {
    children: {
      description: '消息内容',
      defaultValue: '这是一条消息提示',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      description: '消息类型：对应不同样式',
      control: { type: 'select' },
      options: ['info', 'error'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'info' },
      },
      defaultValue: 'info',
    },
    length: {
      description: '消息长度：适应文本长度或独占一行',
      control: { type: 'inline-radio' },
      options: ['auto', 'full'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
      defaultValue: 'auto',
    },
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

const Template: ComponentStory<typeof Message> = (args) => {
  return <Message {...args} />;
};

export const Usage = Template.bind({});
