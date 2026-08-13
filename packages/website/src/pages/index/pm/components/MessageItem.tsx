import dayjs from 'dayjs';
import React from 'react';

import { Avatar, RichContent, Typography } from '@bangumi/design';
import { css, cx } from '@bangumi/styled-system/css';
import { getUserProfileLink } from '@bangumi/utils/pages';

import type { PrivateMessage } from '../types';

const row = css({ display: 'flex', gap: '12px', marginBottom: '20px' });
const rowSelf = css({ flexDirection: 'row-reverse' });

const body = css({
  flex: '1 1 auto',
  minWidth: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});
const bodySelf = css({ alignItems: 'flex-end' });

const meta = css({ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' });

const nickname = css({ fontWeight: '600', color: '#1f1c1c' });
const time = css({ color: '#9f9b9b', fontSize: '12px' });
const readState = css({ color: '#9f9b9b', fontSize: '12px' });

const bubble = css({
  maxWidth: '100%',
  padding: '10px 14px',
  borderRadius: '12px',
  background: '#f7f7f7',
  overflowWrap: 'anywhere',
});
const bubbleSelf = css({ background: '#fdeef0' });

export function MessageItem({
  message,
  isSelf,
}: {
  message: PrivateMessage;
  isSelf: boolean;
}): React.ReactElement {
  const senderName = isSelf ? (
    <span className={nickname}>我</span>
  ) : (
    <Typography.Link to={getUserProfileLink(message.sender.username)} className={nickname}>
      {message.sender.nickname}
    </Typography.Link>
  );

  return (
    <div className={cx(row, isSelf && rowSelf)}>
      <Avatar src={message.sender.avatar.small} size='xsmall' alt={message.sender.nickname} />
      <div className={cx(body, isSelf && bodySelf)}>
        <div className={meta}>
          {senderName}
          <span className={time}>{dayjs.unix(message.createdAt).format('YYYY-MM-DD HH:mm')}</span>
          {isSelf && <span className={readState}>{message.read ? '已读' : '未读'}</span>}
        </div>
        <div className={cx(bubble, isSelf && bubbleSelf)}>
          <RichContent bbcode={message.content} />
        </div>
      </div>
    </div>
  );
}
