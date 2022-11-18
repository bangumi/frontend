import type { components } from './types';

export type Topics = components['schemas']['PrivateTopicDetail'];
export type Comment = components['schemas']['Comment'];
export type Reply = components['schemas']['Comment']['replies'][0];
