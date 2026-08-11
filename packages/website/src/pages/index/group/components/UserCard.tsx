import React from 'react';

import { Image, Typography } from '@bangumi/design';
import { css, cx } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';

// TODO: 重写 Link
const { Link } = Typography;

export interface UserCardProps {
  user: {
    nickname: string;
    avatar: string;
    username: string;
  };
  mode?: 'vertical' | 'horizontal';
}

const userCard = css({
  display: 'flex',
  fontSize: '14px',
  wordBreak: 'break-all',
});

const userCardMode = {
  vertical: css({
    flexDirection: 'column',
    alignItems: 'center',
    width: '60px',
  }),
  horizontal: css({
    width: '290px',
  }),
} satisfies Record<NonNullable<UserCardProps['mode']>, string>;

const avatar = css({
  width: '60px',
  height: '60px',
  display: 'block',
});

const avatarMode = {
  vertical: css({ marginBottom: '5px' }),
  horizontal: css({ marginRight: '10px' }),
} satisfies Record<NonNullable<UserCardProps['mode']>, string>;

export const UserCard: React.FC<UserCardProps> = ({ user, mode = 'vertical' }) => {
  return (
    <Link
      className={cx(userCard, userCardMode[mode])}
      to={getUserProfileLink(user.username)}
      fontWeight='bold'
    >
      <Image
        className={cx(avatar, avatarMode[mode])}
        src={user.avatar}
        alt={`${user.nickname} 头像`}
      />
      {user.nickname}
    </Link>
  );
};
