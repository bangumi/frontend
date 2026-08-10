import React from 'react';

import type { User } from '@bangumi/client/client';
import { Image, Typography } from '@bangumi/design';
import { getGroupLink, getUserGroupsPageLink } from '@bangumi/utils/pages';
import { useUserGroups } from '@bangumi/website/hooks/use-user-groups';

import styles from './SimpleListBlock.module.less';

const { Link } = Typography;

/** 用户主页的小组块 */
const GroupBlock: React.FC<{ user: User }> = ({ user }) => {
  const { data: groups } = useUserGroups(user.username, 6);

  if (!groups || groups.length === 0) {
    return null;
  }

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>
        <Link to={getUserGroupsPageLink(user.username)}>{user.nickname}参加的小组</Link>
      </h2>
      <ul className={styles.list}>
        {groups.map((group) => (
          <li key={group.name} className={styles.groupItem}>
            <Image src={group.icon.medium} alt='' className={styles.groupIcon} />
            <div className={styles.groupInfo}>
              <Link to={getGroupLink(group.name)}>{group.title}</Link>
              <span className={styles.meta}>{group.members} 位成员</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GroupBlock;
