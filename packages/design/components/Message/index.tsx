import './style';

import classnames from 'classnames';
import React from 'react';

import { ReactComponent as Error } from './assets/error.svg';

export interface MessageProps {
  /** 消息类型：对应不同样式 */
  type?: 'info' | 'error';
  /** 消息长度：适应文本长度或独占一行 */
  length?: 'auto' | 'full';
  /** 自定义类名 */
  classname?: string;
}

const Message = ({
  type = 'info',
  length = 'auto',
  classname,
  children,
}: React.PropsWithChildren<MessageProps>) => {
  const classes = classnames(
    'bgm-message',
    `bgm-message-${type}`,
    { 'bgm-message-full': length === 'full' },
    classname,
  );

  return (
    <div className={classes} data-testid='message'>
      <div>
        <Error />
        {children}
      </div>
    </div>
  );
};

export default Message;
