import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from '@bangumi/design';
import { css } from '@bangumi/styled-system/css';

import type { PMFolder, PrivateMessageConversation } from '../types';

const item = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 4px',
  borderBottom: '1px dashed #e8e3e3',
  color: 'inherit',
  textDecoration: 'none',
  _hover: { background: 'rgba(240, 145, 153, 0.06)' },
});

const main = css({ flex: '1 1 auto', minWidth: '0' });

const titleRow = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
  overflow: 'hidden',
});

const nickname = css({ fontWeight: '600', color: '#1f1c1c', flexShrink: '0' });

const title = css({
  color: '#595555',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const preview = css({
  marginTop: '2px',
  color: '#9f9b9b',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const meta = css({ flexShrink: '0', display: 'flex', alignItems: 'center', gap: '8px' });

const time = css({ color: '#9f9b9b', fontSize: '12px' });

const unread = css({
  minWidth: '18px',
  height: '18px',
  padding: '0 5px',
  borderRadius: '9px',
  background: '#f09199',
  color: '#fff',
  fontSize: '12px',
  lineHeight: '18px',
  textAlign: 'center',
});

export function ConversationItem({
  conversation,
  folder,
}: {
  conversation: PrivateMessageConversation;
  folder: PMFolder;
}): React.ReactElement {
  const { id, title: titleText, other, lastMessage, unreadCount } = conversation;
  const lastSenderName = lastMessage.sender.id === other.id ? other.nickname : '我';

  return (
    <Link to={`/pm/conversation/${id}`} className={item}>
      <Avatar src={other.avatar.small} size='xsmall' alt={other.nickname} />
      <div className={main}>
        <div className={titleRow}>
          <span className={nickname}>{other.nickname}</span>
          <span className={title}>{titleText}</span>
        </div>
        {/* TODO: 对接 API 后对 BBCode 内容做纯文本预览 */}
        <div className={preview}>
          {lastSenderName}：{lastMessage.content}
        </div>
      </div>
      <div className={meta}>
        <span className={time}>{dayjs.unix(lastMessage.createdAt).format('YYYY-MM-DD')}</span>
        {folder === 'inbox' && unreadCount > 0 && <span className={unread}>{unreadCount}</span>}
      </div>
    </Link>
  );
}
