import React from 'react';

import type { User } from '@bangumi/client/client';
import { Avatar } from '@bangumi/design';

import styles from './UserHeader.module.less';

const UserHeader: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className={styles.header}>
      <Avatar src={user.avatar.large} size='large' alt={`${user.nickname} 头像`} />
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <span className={styles.nickname}>{user.nickname}</span>
          <span className={styles.username}>@{user.username}</span>
        </div>
        {user.sign && <p className={styles.sign}>{user.sign}</p>}
      </div>
    </div>
  );
};

export default UserHeader;
