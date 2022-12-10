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
export interface GroupMember {
  avatar: components['schemas']['Avatar'];
  id: number;
  nickname: string;
  username: string;
  joinedAt: number;
}
export type GroupTopics = components['schemas']['PrivateTopicDetail'];
