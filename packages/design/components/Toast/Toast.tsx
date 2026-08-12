import { delay } from 'lodash-es';
import React from 'react';

import { css, cx } from '@bangumi/styled-system/css';

import Message from '../Message';
import type { Toast as TToast } from './types';
import { removeToastEvent } from './utils/event-bus';

const toastItem = css({
  transition: 'opacity 0.3s ease-in-out',
  opacity: '0',
  marginBottom: '5px',
  maxWidth: '600px',
  '&.bgm-toast--visible': {
    opacity: '1',
  },
});

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
    <div className={cx('bgm-toast', toastItem, isVisible && 'bgm-toast--visible')}>
      <Message type={type}>{message}</Message>
    </div>
  );
};
