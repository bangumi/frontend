import React from 'react';

import { Avatar, Typography } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';

const { Link } = Typography;

const list = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

const listItem = css({
  display: 'flex',
  gap: '8px',
  padding: '8px 5px',
  borderBottom: '1px dotted #e8e3e3',
  '&:last-child': { borderBottom: 'none' },
});

const info = css({
  flex: '1',
  minWidth: 0,
  lineHeight: '1.35',
});

const title = css({
  fontSize: '14px',
  overflowWrap: 'anywhere',
});

const replies = css({
  color: '#9f9b9b',
});

const extra = css({
  margin: '3px 0 0',
  color: '#595555',
  fontSize: '13px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

interface SideTopicItem {
  id: number;
  title: string;
  replyCount: number;
  creatorAvatar: string;
  creatorUsername: string;
  topicLink: string;
  /** 下方说明（小组名/条目名） */
  extra: React.ReactNode;
}

/**
 * 首页侧栏话题列表（小组话题 / 热门条目讨论共用），对齐 PHP sideTpcList
 */
const SideTopicList: React.FC<{ items: SideTopicItem[] }> = ({ items }) => {
  return (
    <ul className={list}>
      {items.map((item) => (
        <li key={item.id} className={listItem}>
          <Link to={getUserProfileLink(item.creatorUsername)}>
            <Avatar src={item.creatorAvatar} size='small' alt='' />
          </Link>
          <div className={info}>
            <Link to={item.topicLink} className={title} title={item.title}>
              {item.title}
            </Link>
            <small className={replies}>(+{item.replyCount})</small>
            <p className={extra}>{item.extra}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SideTopicList;
