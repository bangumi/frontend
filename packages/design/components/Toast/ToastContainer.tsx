import React from 'react';

import { Toast } from './Toast';
import type { Toast as TToast } from './types';
import { insertToastEvent, removeToastEvent } from './utils/event-bus';

interface ToastContainerProps {
  onEmpty?: () => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ onEmpty }) => {
  const [toasts, setToasts] = React.useState<TToast[]>([]);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    const handleInsertToast = (newToast: TToast) => {
      setToasts([...toasts, newToast]);
    };

    insertToastEvent.subscribe(handleInsertToast);

    return () => {
      insertToastEvent.unsubscribe(handleInsertToast);
    };
  }, [toasts]);

  React.useEffect(() => {
    const handleRemoveToast = (toast: TToast) => {
      setToasts(toasts.filter((t) => t.tid !== toast.tid));
    };

    removeToastEvent.subscribe(handleRemoveToast);

    return () => {
      removeToastEvent.unsubscribe(handleRemoveToast);
    };
  }, [toasts]);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (toasts.length === 0) {
      onEmpty?.();
    }
  }, [toasts, onEmpty]);

  return (
    <>
      {toasts.map((toast) => {
        return <Toast key={toast.tid} toast={toast} />;
      })}
    </>
  );
};
