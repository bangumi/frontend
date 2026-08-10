import React from 'react';

import { Avatar, Typography } from '@bangumi/design';
import { getUserProfileLink } from '@bangumi/utils/pages';

import styles from './SideTopicList.module.less';

const { Link } = Typography;

interface SideTopicItem {
  id: number;
  title: string;
  replyCount: number;
  creatorAvatar: string;
  creatorUsername: string;
  topicLink: string;
  /** 下方说明（小组名/条目名） */
  extra: React.ReactNode;
}

/**
 * 首页侧栏话题列表（小组话题 / 热门条目讨论共用），对齐 PHP sideTpcList
 */
const SideTopicList: React.FC<{ items: SideTopicItem[] }> = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <Link to={getUserProfileLink(item.creatorUsername)}>
            <Avatar src={item.creatorAvatar} size='small' alt='' />
          </Link>
          <div className={styles.info}>
            <Link to={item.topicLink} className={styles.title} title={item.title}>
              {item.title}
            </Link>
            <small className={styles.replies}>(+{item.replyCount})</small>
            <p className={styles.extra}>{item.extra}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SideTopicList;
