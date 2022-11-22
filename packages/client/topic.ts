import type { components } from './types';

export * from './common';

export type Comment = components['schemas']['Comment'];
export type Reply = components['schemas']['Comment']['replies'][0];
