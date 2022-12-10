import type { components } from './types';

export * from './common';

export interface Group {
  id: number;
  name: string;
  createdAt: number;
  title: string;
  /** Format: url */
  icon: string;
  totalMembers: number;
  description: string;
}
export type GroupProfile = components['schemas']['GroupProfile'];
export type GroupMember = components['schemas']['GroupMember'];
export type GroupTopics = components['schemas']['PrivateTopicDetail'];
