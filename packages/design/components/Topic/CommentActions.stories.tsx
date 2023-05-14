import type { StoryFn } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import type { CommentActionsProps } from './CommentActions';
import CommentActions from './CommentActions';

export default {
  title: 'Topic/CommentActions',
  component: CommentActions,
};

const Template: StoryFn<CommentActionsProps> = (args) => {
  return (
    <BrowserRouter>
      <CommentActions {...args} id={375793} />
    </BrowserRouter>
  );
};

export const Basic = Template.bind({});

export const WithText = Template.bind({});
WithText.args = {
  showText: true,
};

export const IsAuthor = Template.bind({});
IsAuthor.args = {
  isAuthor: true,
};
IsAuthor.parameters = {
  docs: {
    description: {
      story: '显示编辑和删除按钮',
    },
  },
};

export const NonEditable = Template.bind({});
NonEditable.args = {
  isAuthor: true,
  editable: false,
};
NonEditable.parameters = {
  docs: {
    description: {
      story: '显示删除按钮，但隐藏编辑按钮，例如有子回复时',
    },
  },
};
