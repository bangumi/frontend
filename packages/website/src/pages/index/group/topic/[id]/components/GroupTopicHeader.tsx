import type { FC } from 'react';
import React, { memo } from 'react';

import type { SlimGroup } from '@bangumi/client/client.ts';
import { Avatar, Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';

interface Header {
  title: string;
  group: SlimGroup;
}

const Link = Typography.Link;

const groupTopicHeader = css({
  marginBottom: '0',
});

const navBar = css({
  fontSize: '16px',
  lineHeight: '22px',
  display: 'flex',
  alignItems: 'center',
  color: '#9f9b9b',
  '& a': {
    paddingLeft: '10px',
  },
  '& .bgm-avatar': {
    paddingRight: '10px',
    border: 'none',
  },
});

const topicTitle = css({
  marginTop: '4px',
  marginBottom: '5px',
  fontSize: '24px',
  lineHeight: '34px',
  fontWeight: '600',
  color: '#1f1c1c',
});

const GroupTopicHeader: FC<Header> = ({ title, group }) => {
  return (
    <div className={groupTopicHeader}>
      <div className={navBar}>
        <Avatar src={group.icon.medium} size='xsmall' />
        <Link to={`/group/${group.name}`}>{group.title}</Link>
        <span>»</span>
        <Link to={`/group/${group.name}/forum`}>组内讨论</Link>
      </div>
      <h1 className={topicTitle}>{title}</h1>
    </div>
  );
};

export default memo(GroupTopicHeader);
