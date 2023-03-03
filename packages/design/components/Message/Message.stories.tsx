import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Message from '.';

const componentMeta: ComponentMeta<typeof Message> = {
  title: 'modern/Message',
  component: Message,
  parameters: {
    docs: {
      description: {
        component: '消息提示块，可以直接用于页面中，也用于Toast组件中。',
      },
    },
  },
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
    blockWidth: {
      description: '消息长度：是否占据整行',
      control: { type: 'inline-radio' },
      options: [true, false],
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      defaultValue: false,
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
  return (
    <>
      <Message {...args} />
    </>
  );
};

export const Usage = Template.bind({});
