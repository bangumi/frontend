import React from 'react';

import type { User } from '@bangumi/client/client';
import { Avatar, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getUserFriendsPageLink, getUserProfileLink } from '@bangumi/utils/pages';
import { useUserFriends } from '@bangumi/website/hooks/use-user-friends';

const { Link } = Typography;

const block = css({
  background: '#fff',
  border: '1px solid #e8e3e3',
  borderRadius: '3px',
  padding: '12px',
  marginBottom: '16px',
});

const title = css({
  margin: '0 0 8px',
  fontSize: '16px',
  color: '#1f1c1c',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    _hover: {
      color: '#54b5df',
    },
  },
});

const friendList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
  gap: '10px',
  '& a': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    textDecoration: 'none',
  },
});

const friendName = css({
  maxWidth: '100%',
  fontSize: '12px',
  color: '#595555',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

/** 用户主页的好友块 */
const FriendBlock: React.FC<{ user: User }> = ({ user }) => {
  const { data: friends } = useUserFriends(user.username, 15);

  if (!friends || friends.length === 0) {
    return null;
  }

  return (
    <section className={block}>
      <h2 className={title}>
        <Link to={getUserFriendsPageLink(user.username)}>{user.nickname}的好友</Link>
      </h2>
      <ul className={friendList}>
        {friends.map((friend) => (
          <li key={friend.username}>
            <Link to={getUserProfileLink(friend.username)} title={friend.nickname}>
              <Avatar src={friend.avatar.medium} size='medium' alt={`${friend.nickname} 头像`} />
              <span className={friendName}>{friend.nickname}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FriendBlock;
