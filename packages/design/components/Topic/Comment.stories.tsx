import type { ComponentStory } from '@storybook/react';
import React from 'react';

import commentWithReplies from './__test__/fixtures/commentWithReplies.json';
import singleComment from './__test__/fixtures/singleComment.json';
import Comment from './Comment';

export default {
  title: 'Topic/Comment',
  component: Comment,
};

const Template: ComponentStory<typeof Comment> = (args) => {
  return (
    <div style={{ width: 913 }}>
      <Comment {...args} />
    </div>
  );
};

export const SingleComment = Template.bind({});

SingleComment.args = {
  ...singleComment,
  isReply: false,
  user: null as any,
  created_at: String(new Date()),
  floor: 1,
};

export const CommentWithIcons = Template.bind({});

CommentWithIcons.args = {
  ...singleComment,
  isReply: false,
  is_friend: true,
  originalPosterId: 1,
  created_at: String(new Date()),
  floor: 2,
};

export const CommentWithReplies = Template.bind({});
CommentWithReplies.args = {
  ...commentWithReplies,
  isReply: false,
  is_friend: false,
  created_at: String(new Date()),
  floor: 2,
} as any;

export const SelfComment = Template.bind({});

SelfComment.args = {
  ...singleComment,
  isReply: false,
  is_friend: false,
  created_at: String(new Date()),
  user: singleComment.creator,
  floor: 2,
};
