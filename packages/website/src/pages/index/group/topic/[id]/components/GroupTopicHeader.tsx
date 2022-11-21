import type { FC } from 'react';
import React from 'react';

import { Avatar, Typography, Topic } from '@bangumi/design';
import type { User, Group } from '@bangumi/types/group';
import { getUserProfileLink } from '@bangumi/utils/pages';

import styles from './GroupTopicHeader.module.less';

interface Header {
  title: string;
  createdAt: string | Date;
  creator: User;
  group: Group;
}

const Link = Typography.Link;
const CommentInfo = Topic.CommentInfo;

const GroupTopicHeader: FC<Header> = ({ title, createdAt, creator, group }) => {
  return (
    <div className={styles.groupTopicHeader}>
      <Avatar src={creator.avatar.large} size='medium' />
      <div className={styles.headerMain}>
        <span className={styles.navBar}>
          <div>
            <Link to={getUserProfileLink(creator.username)} isExternal>
              {creator.nickname}
            </Link>
            <span>发表于</span>
            <Link to={`/group/${group.name}`}>{group.title}</Link>
            <span>»</span>
            <Link to={`/group/${group.name}/forum`}>组内讨论</Link>
          </div>
          <CommentInfo createdAt={createdAt} floor='1' />
        </span>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
  );
};

export default GroupTopicHeader;
