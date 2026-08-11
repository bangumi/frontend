import type { FC } from 'react';
import React, { memo } from 'react';

import type { SlimGroup } from '@bangumi/client/client';
import { Avatar, Typography } from '@bangumi/design';

import styles from './GroupTopicHeader.module.less';

interface Header {
  title: string;
  group: SlimGroup;
}

const Link = Typography.Link;

const GroupTopicHeader: FC<Header> = ({ title, group }) => {
  return (
    <div className={styles.groupTopicHeader}>
      <div className={styles.navBar}>
        <Avatar src={group.icon.medium} size='xsmall' />
        <Link to={`/group/${group.name}`}>{group.title}</Link>
        <span>»</span>
        <Link to={`/group/${group.name}/forum`}>组内讨论</Link>
      </div>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default memo(GroupTopicHeader);
