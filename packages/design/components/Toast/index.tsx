import { uniqueId, defer } from 'lodash-es';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { ToastContainer } from './ToastContainer';
import './style';
import { insertToastEvent } from './utils/event-bus';
export { Toast } from './Toast';

const TOAST_CONTAINER_CLS_NAME = 'bgm-toast--container';

interface ToastOptions {
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
    insertToastEvent.emit({ message, tid: uniqueId(), timeout: options.timeout });
  });
}
