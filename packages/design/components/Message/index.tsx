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
    'bgm-message',
    `bgm-message--${type}`,
    { 'bgm-message--block': blockWidth },
    className,
  );

  return (
    <div className={classes}>
      <div className='bgm-message__content'>
        <Error />
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Message;
