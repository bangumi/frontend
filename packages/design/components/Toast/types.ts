import type { MessageType } from '../Message';

export interface Toast {
  message: string;
  tid: string;
  type?: MessageType;
  timeout?: number;
}
