import React, { memo } from 'react';

import type { SlimGroup } from '@bangumi/client/client';
import { Avatar, Button, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';

import GroupActions from './GroupActions';

const { Link } = Typography;

const groupInfo = css({
  display: 'flex',
});

const groupDetails = css({
  marginLeft: '10px',
  '& > a': {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '22px',
  },
  '& > span': {
    fontSize: '12px',
    lineHeight: '17px',
    color: '#9f9b9b',
  },
});

const groupButtons = css({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '12px',
  '& > .bgm-button': {
    padding: '0 20px',
  },
});

const GroupInfo = memo(({ group }: { group: SlimGroup }) => {
  return (
    <>
      <div className={groupInfo}>
        <Avatar src={group.icon.large} size='medium' />
        <div className={groupDetails}>
          <Link to={`/group/${group.name}`}>{group.title}</Link>
          <span>{`${group.members} 名成员`}</span>
        </div>
      </div>
      <GroupActions group={group} size='medium' className={groupButtons} />
      <div className={groupButtons}>
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
