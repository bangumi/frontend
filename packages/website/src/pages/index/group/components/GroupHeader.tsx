import dayjs from 'dayjs';
import React, { useState } from 'react';

import type { Group } from '@bangumi/client/client';
import { CollapsibleContent, Image, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { render as renderBBCode } from '@bangumi/utils/bbcode/react';

import GroupActions from './GroupActions';

const { Text } = Typography;

const groupHeader = css({
  display: 'flex',
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

// 原 GroupHeader.module.less 未定义这两个类，className 原本为 undefined
const groupDescription = css({});
const groupButtons = css({});

export const GroupHeader: React.FC<{ group: Group }> = ({ group }) => {
  const [collapsed, setCollapsed] = useState(true);

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
        <CollapsibleContent
          content={renderBBCode(group.description)}
          containerClassName={groupDescription}
          threshold={158}
          collapsed={collapsed}
          onChange={setCollapsed}
        />
        <GroupActions group={group} size='medium' className={groupButtons} />
      </div>
    </div>
  );
};
