import type { ComponentStory } from '@storybook/react';
import React from 'react';

import repliesComment from './__test__/fixtures/repliesComment.json';
import singleComment from './__test__/fixtures/singleComment.json';
import specialComment from './__test__/fixtures/specialComment.json';
import mockedCurrentUser from './__test__/fixtures/user.json';
import type { CommentProps } from './Comment';
import Comment from './Comment';

export default {
  title: 'Topic/Comment',
  component: Comment,
};

const Template: ComponentStory<typeof Comment> = (args: CommentProps & { states?: number[] }) => {
  // 0 正常评论 6 被用户删除 7 违反社区指导原则，已被删除
  // 1 关闭 2 重开 5 下沉
  return (
    <div style={{ width: 913 }}>
      {(args.states ?? [0]).map((state, idx) => (
        <div key={idx} style={{ marginBottom: 20 }}>
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
  states: [0, 6, 7],
} as any;

export const CommentWithReplies = Template.bind({});
CommentWithReplies.args = {
  ...repliesComment,
  isReply: false,
  is_friend: false,
  created_at: String(new Date()),
  floor: 2,
} as any;

export const SelfComment = Template.bind({});

const selfUser = { ...mockedCurrentUser, id: 1 };

SelfComment.args = {
  ...singleComment,
  isReply: false,
  is_friend: false,
  created_at: String(new Date()),
  user: selfUser,
  floor: 2,
} as any;

export const SpecialComment = Template.bind({});

SpecialComment.args = {
  ...specialComment,
  isReply: false,
  is_friend: false,
  created_at: String(new Date()),
  floor: 2,
  states: [1, 2, 5],
} as any;
