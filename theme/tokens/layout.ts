import { defineTokens } from '@pandacss/dev';

/**
 * 4px 基准刻度。1–8 是设计系统登记的全部间距；
 * 9 以上仍是 Panda 默认值，属于未登记区间，不应在新 UI 中使用。
 */
export const spacing = defineTokens.spacing({
  1: { value: '4px' },
  2: { value: '8px' },
  3: { value: '12px' },
  4: { value: '16px' },
  5: { value: '24px' },
  6: { value: '32px' },
  7: { value: '48px' },
  8: { value: '64px' },
});

export const sizes = defineTokens.sizes({
  control: {
    sm: { value: '32px' },
    md: { value: '42px' },
    lg: { value: '48px' },
  },
  /** 触屏最小命中面积。 */
  touch: { value: '44px' },
  container: {
    reading: { value: 'min(100% - 32px, 720px)' },
    content: { value: 'min(100% - 32px, 1200px)' },
    wide: { value: 'min(100% - 48px, 1440px)' },
  },
});

/** sm/md 覆盖了 Panda 默认值；xs/lg 及以上仍是默认值，属于未登记区间。 */
export const radii = defineTokens.radii({
  none: { value: '0px' },
  sm: { value: '4px' },
  md: { value: '8px' },
  pill: { value: '999px' },
});

export const borderWidths = defineTokens.borderWidths({
  DEFAULT: { value: '1px' },
});

export const shadows = defineTokens.shadows({
  raised: { value: '0 2px 8px rgb(0 0 0 / 10%)' },
  overlay: { value: '0 12px 32px rgb(0 0 0 / 18%)' },
});
