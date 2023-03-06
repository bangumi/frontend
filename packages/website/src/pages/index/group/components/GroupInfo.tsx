import type { Group } from 'packages/client/group';
import React, { memo, useState } from 'react';

import { Avatar, Button, CollapsibleContent, Section, Typography } from '@bangumi/design';
import { render as renderBBCode } from '@bangumi/utils';

import styles from './GroupInfo.module.less';

const { Link } = Typography;

const GroupInfo = memo(({ group }: { group: Group }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Section title='小组信息'>
      <div className={styles.groupInfo}>
        <Avatar src={group.icon} size='medium' />
        <div className={styles.groupDetails}>
          <Link to={`/group/${group.name}`}>{group.title}</Link>
          <span>{`${group.totalMembers} 名成员`}</span>
        </div>
      </div>
      <CollapsibleContent
        content={renderBBCode(group.description)}
        containerClassName={styles.groupDescription}
        threshold={158}
        collapsed={collapsed}
        onChange={setCollapsed}
      />
      <div className={styles.groupOpinions}>
        <Button.Link type='secondary' size='medium' to={`/group/${group.name}`}>
          小组概览
        </Button.Link>
        <Button.Link type='secondary' size='medium' to={`/group/${group.name}/forum`}>
          组内讨论
        </Button.Link>
        <Button.Link type='secondary' size='medium' to={`/group/${group.name}/members`}>
          小组成员
        </Button.Link>
      </div>
    </Section>
  );
});

export default GroupInfo;
