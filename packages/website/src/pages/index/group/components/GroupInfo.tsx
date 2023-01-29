import type { Group } from 'packages/client/group';
import React, { memo } from 'react';

import { Avatar, Button, Section, Typography } from '@bangumi/design';
import { render as renderBBCode } from '@bangumi/utils';

import { ClampableContent } from './ClampableContent';
import styles from './GroupInfo.module.less';

const { Link } = Typography;

const GroupInfo = memo(({ group }: { group: Group }) => (
  <Section title='小组信息'>
    <div className={styles.groupInfo}>
      <Avatar src={group.icon} size='medium' />
      <div className={styles.groupDetails}>
        <Link to={`/group/${group.name}`}>{group.title}</Link>
        <span>{`${group.totalMembers} 名成员`}</span>
      </div>
    </div>
    <ClampableContent
      content={renderBBCode(group.description)}
      containerClassName={styles.groupDescription}
      threshold={158}
      isClamped
    />
    <div className={styles.groupOpinions}>
      <Button type='text'>
        <Link to={`/group/${group.name}`}>小组概览</Link>
      </Button>
      <Button type='text'>
        <Link to={`/group/${group.name}/forum`}>组内讨论</Link>
      </Button>
      <Button type='text'>
        <Link to={`/group/${group.name}/members`}>小组成员</Link>
      </Button>
    </div>
  </Section>
));

export default GroupInfo;
