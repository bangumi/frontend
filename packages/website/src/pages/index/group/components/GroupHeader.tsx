import dayjs from 'dayjs';
import React, { useState } from 'react';

import type { Group } from '@bangumi/client/group';
import { CollapsibleContent, Image, Typography } from '@bangumi/design';
import { render as renderBBCode } from '@bangumi/utils';

import GroupActions from './GroupActions';
import styles from './GroupHeader.module.less';

const { Text } = Typography;
export const GroupHeader: React.FC<{ group: Group }> = ({ group }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={styles.groupHeader}>
      <div className={styles.thumbnail}>
        {group.icon.large && (
          <Image className={styles.thumbnail} src={group.icon.large} alt={`${group.title} 头像`} />
        )}
      </div>
      <div className={styles.infoCol}>
        <div className={styles.title}>{group.title}</div>
        <div>
          <Text type='secondary'>
            {' '}
            创建于 {dayjs.unix(group.createdAt).format('YYYY-M-D HH:mm')} | 现有 {group.members}{' '}
            名成员{' '}
          </Text>
        </div>
        <CollapsibleContent
          content={renderBBCode(group.description)}
          containerClassName={styles.groupDescription}
          threshold={158}
          collapsed={collapsed}
          onChange={setCollapsed}
        />
        <GroupActions group={group} size='medium' className={styles.groupButtons} />
      </div>
    </div>
  );
};
