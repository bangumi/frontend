import type { GroupProfile } from 'packages/client/group';
import React, { memo, useState } from 'react';

import { Avatar, Button, CollapsibleContent, Typography } from '@bangumi/design';
import { render as renderBBCode } from '@bangumi/utils';

import GroupActions from './GroupActions';
import styles from './GroupInfo.module.less';

const { Link } = Typography;

const GroupInfo = memo(({ groupProfile }: { groupProfile: GroupProfile }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { group } = groupProfile;

  return (
    <>
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
      <GroupActions groupProfile={groupProfile} size='medium' className={styles.groupButtons} />
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
