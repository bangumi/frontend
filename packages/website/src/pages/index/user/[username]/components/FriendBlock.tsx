import React from 'react';

import type { User } from '@bangumi/client/client';
import { Avatar, Typography } from '@bangumi/design';
import { getUserFriendsPageLink, getUserProfileLink } from '@bangumi/utils/pages';
import { useUserFriends } from '@bangumi/website/hooks/use-user-friends';

import styles from './FriendBlock.module.less';

const { Link } = Typography;

/** 用户主页的好友块 */
const FriendBlock: React.FC<{ user: User }> = ({ user }) => {
  const { data: friends } = useUserFriends(user.username, 15);

  if (!friends || friends.length === 0) {
    return null;
  }

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>
        <Link to={getUserFriendsPageLink(user.username)}>{user.nickname}的好友</Link>
      </h2>
      <ul className={styles.friendList}>
        {friends.map((friend) => (
          <li key={friend.username}>
            <Link to={getUserProfileLink(friend.username)} title={friend.nickname}>
              <Avatar src={friend.avatar.medium} size='medium' alt={`${friend.nickname} 头像`} />
              <span className={styles.friendName}>{friend.nickname}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FriendBlock;
