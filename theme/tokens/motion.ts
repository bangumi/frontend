import { defineTokens } from '@pandacss/dev';

export const durations = defineTokens.durations({
  fast: { value: '120ms' },
  normal: { value: '200ms' },
  slow: { value: '320ms' },
});

export const easings = defineTokens.easings({
  standard: { value: 'cubic-bezier(0.2, 0, 0, 1)' },
});
