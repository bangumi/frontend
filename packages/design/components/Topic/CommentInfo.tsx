import './style';

import dayjs from 'dayjs';
import type { FC } from 'react';
import React, { memo } from 'react';

export interface CommentInfoProps {
  floor: string | number;
  isSpecial?: boolean;
  createdAt: number | string | Date;
  id?: number;
}

const spaces = '\u00A0'.repeat(2);

const CommentInfo: FC<CommentInfoProps> = ({ floor, createdAt, isSpecial = false, id = '' }) => {
  let date: string;
  if (typeof createdAt === 'number') {
    date = dayjs(createdAt * 1000).format('YYYY-M-D HH:mm');
  } else {
    date = dayjs(createdAt).format('YYYY-M-D HH:mm');
  }

  return !isSpecial ? (
    <span className='bgm-topic__commentInfo'>
      <a href={`#post_${id}`}>#{floor}</a>
      {spaces}|{spaces}
      {date}
    </span>
  ) : (
    <span className='bgm-topic__commentInfo'>{date}</span>
  );
};

export default memo(CommentInfo);
