import dayjs from 'dayjs';
import React from 'react';

import type { Group } from '@bangumi/client/client';
import { Image, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';

const { Text } = Typography;

const groupHeader = css({
  display: 'flex',
  // 对齐旧版 grp_box 的浅灰背景
  background: '#f7f7f4',
  borderRadius: '15px',
  padding: '15px',
  '& > *': {
    marginRight: '20px',
  },
});

const title = css({
  fontSize: '24px',
  lineHeight: '34px',
  fontWeight: '600',
  color: '#1f1c1c',
});

const thumbnail = css({
  width: '75px',
  height: '75px',
  borderRadius: '19px',
});

const infoCol = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '7.5px 0',
});

export const GroupHeader: React.FC<{ group: Group }> = ({ group }) => {
  return (
    <div className={groupHeader}>
      <div className={thumbnail}>
        {group.icon.large && (
          <Image className={thumbnail} src={group.icon.large} alt={`${group.title} 头像`} />
        )}
      </div>
      <div className={infoCol}>
        <div className={title}>{group.title}</div>
        <div>
          <Text type='secondary'>
            {' '}
            创建于 {dayjs.unix(group.createdAt).format('YYYY-M-D HH:mm')} | 现有 {group.members}{' '}
            名成员{' '}
          </Text>
        </div>
      </div>
    </div>
  );
};
