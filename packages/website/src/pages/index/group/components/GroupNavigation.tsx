import type { GroupProfile } from 'packages/client/group';
import React from 'react';

import { Button, Typography } from '@bangumi/design';

import styles from './GroupNavigation.module.less';

const Link = Typography.Link;

const GroupNavigation = ({ group }: { group: GroupProfile }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <Button.Link color='blue' to={`/group/${group.group.name}/new_topic`}>
          发表新主题
        </Button.Link>
        <div className={styles.links}>
          话题：<Link to='#'>我发表的</Link> | <Link to='#'>我回复的</Link>
        </div>
      </div>
      <div className={styles.section}>
        <Button color='blue' type='secondary'>
          {group.inGroup ? '退出' : '加入'}这个小组
        </Button>
        <div className={styles.links}>
          小组：<Link to='#'>我管理的</Link> | <Link to='#'>我参加的</Link>
        </div>
      </div>
    </div>
  );
};

export default GroupNavigation;
