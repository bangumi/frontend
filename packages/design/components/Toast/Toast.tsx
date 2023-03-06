import './style';

import classnames from 'classnames';
import { delay } from 'lodash';
import React from 'react';

import Message from '../Message';
import type { Toast as TToast } from './types';
import { removeToastEvent } from './utils/event-bus';

interface ToastProps {
  toast: TToast;
}

const DEFAULT_TOAST_TIMEOUT = 5000;
// 需要与 CSS 中的 transition 同步
const FADE_OUT_TIME = 300;

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  const { message, timeout = DEFAULT_TOAST_TIMEOUT, type } = toast;
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
    const timer = delay(() => {
      setIsVisible(false);
      delay(() => {
        removeToastEvent.emit(toast);
      }, FADE_OUT_TIME);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [toast, timeout]);

  return (
    <div
      className={classnames('bgm-toast', {
        'bgm-toast--visible': isVisible,
      })}
    >
      <Message type={type}>{message}</Message>
    </div>
  );
};
