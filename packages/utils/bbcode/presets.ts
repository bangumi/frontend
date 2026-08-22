import type { BBCodeOptions } from './types.ts';

const richContent = {
  bbcode: true,
  stickers: true,
  images: 'display',
} as const satisfies BBCodeOptions;

const textDescription = {
  bbcode: true,
  stickers: false,
  images: 'link',
} as const satisfies BBCodeOptions;

const textComment = {
  bbcode: true,
  stickers: true,
  images: 'link',
} as const satisfies BBCodeOptions;

export const BBCodePreset = {
  topic: richContent,
  blog: richContent,
  blogComment: richContent,
  episodeComment: richContent,
  groupDescription: textDescription,
  userBio: textDescription,
  indexDescription: {
    bbcode: true,
    stickers: false,
    images: 'display',
  },
  indexComment: textComment,
  characterComment: textComment,
  personComment: textComment,
} as const satisfies Record<string, BBCodeOptions>;

export type BBCodePresetName = keyof typeof BBCodePreset;
