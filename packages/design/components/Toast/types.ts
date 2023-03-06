import type { MessageType } from '@bangumi/design';

export interface Toast {
  message: string;
  tid: string;
  type?: MessageType;
  timeout?: number;
}
