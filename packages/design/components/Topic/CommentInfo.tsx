import dayjs from 'dayjs';
import React from 'react';

export interface CommentInfoProps {
  floor: string | number;
  isSpecial?: boolean;
  createdAt: string | Date;
}

const spaces = '\u00A0'.repeat(2);

const CommentInfo: React.FC<CommentInfoProps> = ({ floor, createdAt, isSpecial = false }) => {
  const date = dayjs(createdAt).format('YYYY-M-D HH:mm');
  return !isSpecial ? (
    <span className='bgm-topic__commentInfo'>
      #{floor}
      {spaces}|{spaces}
      {date}
      {spaces}|{spaces}!
    </span>
  ) : (
    <span className='bgm-topic__commentInfo'>{date}</span>
  );
};

export default CommentInfo;
