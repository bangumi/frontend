import './style';

import classnames from 'classnames';
import React from 'react';

import { ReactComponent as Error } from '../../../icons/assets/error.svg';

export interface MessageProps {
  /** 消息类型：对应不同样式 */
  type?: 'info' | 'error';
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
    <div className={classes} data-testid='message'>
      <div className='bgm-message__content'>
        <Error />
        <span>{children}</span>
      </div>
      {/* <p></p> */}
    </div>
  );
};

export default Message;
