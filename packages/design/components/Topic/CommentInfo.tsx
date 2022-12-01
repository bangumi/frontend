import dayjs from 'dayjs';
import type { FC } from 'react';
import React from 'react';

export interface CommentInfoProps {
  floor: string | number;
  isSpecial?: boolean;
  createdAt: string | Date;
  id?: string;
}

const spaces = '\u00A0'.repeat(2);

// Todo: report
const CommentInfo: FC<CommentInfoProps> = ({ floor, createdAt, isSpecial = false, id = '' }) => {
  const date = dayjs(createdAt).format('YYYY-M-D HH:mm');
  return !isSpecial ? (
    <span className='bgm-topic__commentInfo'>
      <a href={`#${id}`}>#{floor}</a>
      {spaces}|{spaces}
      {date}
      {spaces}|{spaces}!
    </span>
  ) : (
    <span className='bgm-topic__commentInfo'>{date}</span>
  );
};

export default CommentInfo;
