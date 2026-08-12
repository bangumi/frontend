import React from 'react';

import type { SlimGroup } from '@bangumi/client/client';
import { Image, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';

const { Link } = Typography;

const groupList = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px 30px',
  smDown: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const groupCard = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  minWidth: '0',
  fontSize: '14px',
});

const groupIcon = css({
  flexShrink: '0',
  width: '60px',
  height: '60px',
  display: 'block',
  borderRadius: '10px',
});

const groupTitle = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const groupMembers = css({
  display: 'block',
  marginTop: '2px',
  color: '#9f9b9b',
  fontSize: '12px',
});

/** 小组卡片网格（头像 + 标题 + 成员数） */
const GroupList: React.FC<{ groups: SlimGroup[] }> = ({ groups }) => {
  return (
    <ul className={groupList}>
      {groups.map((group) => (
        <li key={group.id}>
          <Link className={groupCard} to={`/group/${group.name}`} fontWeight='bold'>
            <Image className={groupIcon} src={group.icon.large} alt={`${group.title} 小组图标`} />
            <span>
              <span className={groupTitle}>{group.title}</span>
              <small className={groupMembers}>{group.members} 位成员</small>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GroupList;
