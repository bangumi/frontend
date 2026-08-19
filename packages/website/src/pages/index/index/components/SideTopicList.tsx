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

/* 对齐原站 sideTpcList（line_row 斑马纹）：奇数行 #FFF / 偶数行 #F9F9F9 + 点状分隔线 */
const listItem = css({
  display: 'flex',
  gap: '8px',
  padding: '5px',
  borderBottom: '1px dotted #e0e0e0',
  '&:nth-child(odd)': { background: '#fff' },
  '&:nth-child(even)': { background: '#f9f9f9' },
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

/* 对齐原站 .sideTpcList li small：10px #999 */
const replies = css({
  color: '#999',
  fontSize: '10px',
});

/* 对齐原站 p.info（12px #999）与 a.tip 链接（#666，hover #333） */
const extra = css({
  margin: '3px 0 0',
  color: '#999',
  fontSize: '12px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '& a': {
    color: '#666',
  },
  '& a:hover': {
    color: '#333',
  },
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
            {/* 对齐原站 avatarReSize32 */}
            <Avatar src={item.creatorAvatar} size='xsmall' alt='' />
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
