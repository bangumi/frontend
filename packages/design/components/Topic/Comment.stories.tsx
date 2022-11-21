import type { ComponentStory } from '@storybook/react';
import React from 'react';

import commentWithReplies from './__test__/fixtures/commentWithReplies.json';
import singleComment from './__test__/fixtures/singleComment.json';
import specialComment from './__test__/fixtures/specialComment.json';
import Comment from './Comment';

export default {
  title: 'Topic/Comment',
  component: Comment,
};

const Template: ComponentStory<typeof Comment> = (args) => {
  const states = [1, 2, 5];
  return (
    <div style={{ width: 913 }}>
      <Comment {...args} />
    </div>
  );
};

const SpecialCommentTemplate: ComponentStory<typeof Comment> = (args) => {
  // 1 关闭 2 重开 5 下沉 6 被用户删除 7 违反社区指导原则，已被删除
  const states = [1, 2, 5, 6, 7];
  return (
    <div style={{ width: 913 }}>
      {states.map((state, idx) => (
        <div key={idx} style={{ marginBottom: 10 }}>
          <h1>State: {state}</h1>
          <Comment {...args} state={state as any} />
        </div>
      ))}
    </div>
  );
};

export const SingleComment = Template.bind({});

SingleComment.args = {
  ...singleComment,
  isReply: false,
  is_friend: true,
  originalPosterId: 1,
  created_at: String(new Date()),
  floor: 2,
} as any;

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
} as any;

export const SpecialComment = SpecialCommentTemplate.bind({});

SpecialComment.args = {
  ...specialComment,
  isReply: false,
  is_friend: false,
  created_at: String(new Date()),
  floor: 2,
} as any;
