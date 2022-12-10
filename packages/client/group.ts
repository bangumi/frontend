import type { Topic } from './client';
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
export interface GroupProfile {
  recentAddedMembers: Array<{
    avatar: {
      small: string;
      medium: string;
      large: string;
    };
    id: number;
    nickname: string;
    username: string;
    joinedAt: number;
  }>;
  topics: Topic[];
  inGroup: boolean;
  group: {
    id: number;
    name: string;
    nsfw: boolean;
    title: string;
    icon: string;
    description: string;
    totalMembers: number;
    createdAt: number;
  };
  totalTopics: number;
}

export interface GroupMember {
  avatar: components['schemas']['Avatar'];
  id: number;
  nickname: string;
  username: string;
  joinedAt: number;
}
