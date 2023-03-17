import './style';

import classnames from 'classnames';
import React from 'react';

import { Error } from '@bangumi/icons';

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
  const classes = classnames(
    'bgm-message__content',
    `bgm-message__content--${type}`,
    { 'bgm-message__content--block': blockWidth },
    className,
  );

  return (
    <div className='bgm-message'>
      <div className={classes}>
        <Error />
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Message;
