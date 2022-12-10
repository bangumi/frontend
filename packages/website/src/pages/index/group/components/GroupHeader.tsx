import dayjs from 'dayjs';
import React from 'react';

import type { GroupProfile } from '@bangumi/client/group';
import { Image, Typography } from '@bangumi/design';

import styles from './GroupHeader.module.less';

const { Text } = Typography;
export const GroupHeader: React.FC<{ group: GroupProfile }> = ({ group }) => {
  return (
    <div className={styles.groupHeader}>
      <div className={styles.thumbnail}>
        {group.group.icon && (
          <Image
            className={styles.thumbnail}
            src={group.group.icon}
            alt={`${group.group.title} 头像`}
          />
        )}
      </div>
      <div className={styles.infoCol}>
        <div className={styles.title}>{group.group.title}</div>
        <div>
          <Text type='secondary'>
            {' '}
            创建于 {dayjs.unix(group.group.createdAt).format('YYYY-M-D HH:mm')} | 现有{' '}
            {group.group.totalMembers} 名成员{' '}
          </Text>
        </div>
      </div>
    </div>
  );
};
