import { defer, uniqueId } from 'lodash-es';
import React from 'react';
import ReactDOM from 'react-dom/client';

import type { MessageType } from '@bangumi/design/components/Message/index.tsx';
import { css, cx } from '@bangumi/styled-system/css';

import { ToastContainer } from './ToastContainer.tsx';
import { insertToastEvent } from './utils/event-bus.ts';

export { Toast } from './Toast.tsx';

const toastContainer = css({
  position: 'fixed',
  inset: '0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
  zIndex: '9999',
});

const TOAST_CONTAINER_CLS_NAME = 'bgm-toast__container';

interface ToastOptions {
  type?: MessageType;
  timeout?: number;
}

export function toast(message: string, options: ToastOptions = {}) {
  if (document.getElementsByClassName(TOAST_CONTAINER_CLS_NAME).length === 0) {
    const newContainer = document.createElement('div');
    newContainer.className = cx(TOAST_CONTAINER_CLS_NAME, toastContainer);
    document.body.appendChild(newContainer);
    const root = ReactDOM.createRoot(newContainer);
    const handleEmpty = () => {
      root.unmount();
      document.body.removeChild(newContainer);
    };
    root.render(<ToastContainer onEmpty={handleEmpty} />);
  }

  defer(() => {
    insertToastEvent.emit({
      message,
      tid: uniqueId(),
      type: options.type,
      timeout: options.timeout,
    });
  });
}
