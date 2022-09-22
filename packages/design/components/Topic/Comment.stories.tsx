import React from 'react'
import Comment from './Comment'
import { ComponentStory } from '@storybook/react'
import singleComment from './__test__/fixtures/singleComment.json'

export default {
  title: 'Topic/Comment',
  component: Comment
}

const Template: ComponentStory<typeof Comment> = (
  args
) => {
  return (
    <Comment {...args} />
  )
}

export const SingleComment = Template.bind({})

SingleComment.args = { ...singleComment, isReply: false, author: null as any, created_at: new Date(), floor: 1 }

export const CommentWithIcons = Template.bind({})

CommentWithIcons.args = {
  ...singleComment,
  isReply: false,
  is_friend: true,
  author: { id: 1 } as any,
  created_at: new Date(),
  floor: 1
}
