import './style';

import { defer, uniqueId } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom/client';

import type { MessageType } from '../Message';
import { ToastContainer } from './ToastContainer';
import { insertToastEvent } from './utils/event-bus';

export { Toast } from './Toast';

const TOAST_CONTAINER_CLS_NAME = 'bgm-toast__container';

interface ToastOptions {
  type?: MessageType;
  timeout?: number;
}

export function toast(message: string, options: ToastOptions = {}) {
  if (document.getElementsByClassName(TOAST_CONTAINER_CLS_NAME).length === 0) {
    const newContainer = document.createElement('div');
    newContainer.className = TOAST_CONTAINER_CLS_NAME;
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
