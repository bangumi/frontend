import React from 'react';

import { Error } from '@bangumi/icons/index.tsx';
import { css, cx } from '@bangumi/styled-system/css';

const message = css({ display: 'flex' });

const messageContent = css({
  borderRadius: '19px',
  padding: '9px 16px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '20px',
  '& > svg': {
    flex: 'none',
    width: '20px',
    height: '20px',
    marginRight: '8px',
  },
  '&.bgm-message__content--block': {
    flex: '1',
  },
  '&.bgm-message__content--info': {
    backgroundColor: 'rgba(90, 87, 87, 0.6)',
    color: '#fff',
  },
  '&.bgm-message__content--error': {
    backgroundColor: '#f97f77',
    color: '#fff',
  },
});

export type MessageType = 'info' | 'error';
export interface MessageProps {
  /** 消息类型：对应不同样式 */
  type?: MessageType;
  /** 消息长度：是否占据整行 */
  blockWidth?: boolean;
  /** 自定义类名 */
  className?: string;
}

const Message = ({
  type = 'info',
  blockWidth = false,
  className,
  children,
}: React.PropsWithChildren<MessageProps>) => {
  const classes = cx(
    'bgm-message__content',
    messageContent,
    `bgm-message__content--${type}`,
    blockWidth && 'bgm-message__content--block',
    className,
  );

  return (
    <div className={message}>
      <div className={classes}>
        <Error />
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Message;
