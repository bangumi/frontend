import type { GroupProfile } from 'packages/client/group';
import React from 'react';

import { Button, Section, Typography } from '@bangumi/design';

import styles from './GroupNavigation.module.less';

const Link = Typography.Link;

const GroupNavigation = ({ group }: { group: GroupProfile }) => {
  return (
    <Section title='小组功能'>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <Button.Link color='blue' to={`/group/${group.group.name}/new_topic`}>
            发表新主题
          </Button.Link>
          <Button color='blue' type='secondary'>
            {group.inGroup ? '退出' : '加入'}该小组
          </Button>
        </div>
        <div className={styles.links}>
          <div>
            话题：<Link to='/group/my_topic'>我发表的</Link> |{' '}
            <Link to='/group/my_reply'>我回复的</Link>
            <br />
          </div>
          <div>
            小组：<Link to='#'>我管理的</Link> | <Link to='/group/mine'>我参加的</Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default GroupNavigation;
