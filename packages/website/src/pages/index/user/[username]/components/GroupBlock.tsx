import React from 'react';

import type { User } from '@bangumi/client/client.ts';
import { Image, Typography } from '@bangumi/design/index.tsx';
import { css } from '@bangumi/styled-system/css';
import { getGroupLink, getUserGroupsPageLink } from '@bangumi/utils/pages.ts';
import { useUserGroups } from '@bangumi/website/hooks/use-user-groups.ts';

const { Link } = Typography;

const block = css({
  background: '#fff',
  border: '1px solid #e8e3e3',
  borderRadius: '3px',
  padding: '12px',
  marginBottom: '16px',
});

const title = css({
  margin: '0 0 8px',
  fontSize: '16px',
  color: '#1f1c1c',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    _hover: {
      color: '#54b5df',
    },
  },
});

const list = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
});

const groupItem = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '5px 0',
});

const groupIcon = css({
  width: '32px',
  height: '32px',
  borderRadius: '3px',
  flexShrink: '0',
});

const groupInfo = css({
  minWidth: '0',
  display: 'flex',
  flexDirection: 'column',
  '& a': {
    color: '#595555',
    textDecoration: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    _hover: {
      color: '#54b5df',
    },
  },
});

const meta = css({
  fontSize: '12px',
  color: '#9f9b9b',
});

/** 用户主页的小组块 */
const GroupBlock: React.FC<{ user: User }> = ({ user }) => {
  const { data: groups } = useUserGroups(user.username, 6);

  if (!groups || groups.length === 0) {
    return null;
  }

  return (
    <section className={block}>
      <h2 className={title}>
        <Link to={getUserGroupsPageLink(user.username)}>{user.nickname}参加的小组</Link>
      </h2>
      <ul className={list}>
        {groups.map((group) => (
          <li key={group.name} className={groupItem}>
            <Image src={group.icon.medium} alt='' className={groupIcon} />
            <div className={groupInfo}>
              <Link to={getGroupLink(group.name)}>{group.title}</Link>
              <span className={meta}>{group.members} 位成员</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GroupBlock;
