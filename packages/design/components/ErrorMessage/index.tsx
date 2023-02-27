import './style';

import classnames from 'classnames';
import React from 'react';

import { ReactComponent as Error } from './assets/error.svg';

export interface ErrorMessageProps {
  /** 错误提示文本 */
  message: string;
  /** 适应文本长度或独占一行 */
  length?: 'auto' | 'full';
  /** 自定义类名 */
  classname?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, length = 'auto', classname }) => {
  const classes = classnames(
    'bgm-error-message',
    { 'bgm-error-message-full': length === 'full' },
    classname,
  );

  return (
    <div className={classes}>
      <div>
        <Error />
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
