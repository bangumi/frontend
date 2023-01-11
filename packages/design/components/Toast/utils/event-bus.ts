import EventEmitter from 'eventemitter3';

import type { Toast } from '../types';

const toastEventBus = new EventEmitter();

enum ToastEvent {
  InsertToast = 'INSERT_TOAST',
  RemoveToast = 'REMOVE_TOAST',
}

const createEventOperators = <T extends (...param: any[]) => void>(eventName: string) => {
  return {
    subscribe: (handler: T) => {
      toastEventBus.on(eventName, handler);
    },
    unsubscribe: (handler: T) => {
      toastEventBus.off(eventName, handler);
    },
    emit(...params: Parameters<T>) {
      toastEventBus.emit(eventName, ...params);
    },
  };
};

/* eslint-disable @typescript-eslint/unbound-method */
export const insertToastEvent = createEventOperators<(newToast: Toast) => void>(
  ToastEvent.InsertToast,
);

export const removeToastEvent = createEventOperators<(toast: Toast) => void>(
  ToastEvent.RemoveToast,
);
