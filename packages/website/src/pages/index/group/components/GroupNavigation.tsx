import type { GroupProfile } from 'packages/client/group';
import React from 'react';

import { Section, Typography } from '@bangumi/design';

import GroupActions from './GroupActions';
import styles from './GroupNavigation.module.less';

const Link = Typography.Link;

const GroupNavigation = ({ group }: { group: GroupProfile }) => {
  return (
    <Section title='小组功能'>
      <div className={styles.wrapper}>
        <GroupActions groupProfile={group} className={styles.section} />
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
