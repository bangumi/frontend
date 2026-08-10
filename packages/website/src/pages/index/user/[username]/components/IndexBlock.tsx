import React from 'react';

import type { User } from '@bangumi/client/client';
import { Typography } from '@bangumi/design';
import { getIndexLink, getUserIndexesPageLink } from '@bangumi/utils/pages';
import { useUserIndexes } from '@bangumi/website/hooks/use-user-indexes';

import styles from './SimpleListBlock.module.less';

const { Link } = Typography;

/** 用户主页的目录块 */
const IndexBlock: React.FC<{ user: User }> = ({ user }) => {
  const { data: indexes } = useUserIndexes(user.username, 5);

  if (!indexes || indexes.length === 0) {
    return null;
  }

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>
        <Link to={getUserIndexesPageLink(user.username)}>{user.nickname}的目录</Link>
      </h2>
      <ul className={styles.list}>
        {indexes.map((index) => (
          <li key={index.id} className={styles.textItem}>
            <Link to={getIndexLink(index.id)}>{index.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IndexBlock;
