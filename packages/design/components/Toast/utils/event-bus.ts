import EventEmitter from 'eventemitter3';

import type { Toast } from '../types';

enum ToastEvent {
  InsertToast = 'INSERT_TOAST',
  RemoveToast = 'REMOVE_TOAST',
}

interface EventTypes {
  [ToastEvent.InsertToast]: (newToast: Toast) => void;
  [ToastEvent.RemoveToast]: (toast: Toast) => void;
}

const toastEventBus = new EventEmitter<EventTypes>();

const createEventOperators = <T extends ToastEvent>(eventName: T) => {
  return {
    subscribe: (handler: EventTypes[T]) => {
      toastEventBus.on(eventName, handler);
    },
    unsubscribe: (handler: EventTypes[T]) => {
      toastEventBus.off(eventName, handler);
    },
    emit(...params: Parameters<EventTypes[T]>) {
      toastEventBus.emit(eventName, ...params);
    },
  };
};

/* eslint-disable @typescript-eslint/unbound-method */
export const insertToastEvent = createEventOperators(ToastEvent.InsertToast);

export const removeToastEvent = createEventOperators(ToastEvent.RemoveToast);
