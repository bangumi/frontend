import dayjs from 'dayjs';
import React from 'react';

export interface CommentInfoProps {
  floor: string | number;
  isSpecial?: boolean;
  createdAt: string | Date;
}

const CommentInfo: React.FC<CommentInfoProps> = ({ floor, createdAt, isSpecial = false }) => {
  const date = dayjs(createdAt).format('YYYY-M-D HH:MM');
  return !isSpecial ? (
    <span className='bgm-topic__commentInfo'>
      #{floor}&nbsp;&nbsp;|&nbsp;&nbsp;{date}&nbsp;&nbsp;|&nbsp;&nbsp;!
    </span>
  ) : (
    <span className='bgm-topic__commentInfo'>{date}</span>
  );
};

export default CommentInfo;
