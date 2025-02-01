import type { SlimGroup } from 'packages/client/group';
import React, { memo } from 'react';

import { Avatar, Button, Typography } from '@bangumi/design';

import styles from './GroupInfo.module.less';

const { Link } = Typography;

const GroupInfo = memo(({ group }: { group: SlimGroup }) => {
  return (
    <>
      <div className={styles.groupInfo}>
        <Avatar src={group.icon.large} size='medium' />
        <div className={styles.groupDetails}>
          <Link to={`/group/${group.name}`}>{group.title}</Link>
          <span>{`${group.members} 名成员`}</span>
        </div>
      </div>
      <div className={styles.groupButtons}>
        <Button.Link type='secondary' size='medium' to={`/group/${group.name}`}>
          概览
        </Button.Link>
        <Button.Link type='secondary' size='medium' to={`/group/${group.name}/forum`}>
          讨论
        </Button.Link>
        <Button.Link type='secondary' size='medium' to={`/group/${group.name}/members`}>
          成员
        </Button.Link>
      </div>
    </>
  );
});

export default GroupInfo;
