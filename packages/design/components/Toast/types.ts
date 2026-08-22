import type { MessageType } from '@bangumi/design/components/Message/index.tsx';

export interface Toast {
  message: string;
  tid: string;
  type?: MessageType;
  timeout?: number;
}
