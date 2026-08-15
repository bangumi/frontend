import { defineGlobalStyles, definePreset } from '@pandacss/dev';

import { breakpoints } from './breakpoints';
import { semanticColors } from './semantic-tokens';
import { textStyles } from './text-styles';
import { colors } from './tokens/colors';
import { borderWidths, radii, shadows, sizes, spacing } from './tokens/layout';
import { durations, easings } from './tokens/motion';
import { fonts, fontSizes, fontWeights, lineHeights } from './tokens/typography';

/**
 * 主题只切换语义颜色，不改变组件结构。
 * 应用入口负责在根元素写入 `data-theme`（用户选择或跟随系统）。
 */
const globalCss = defineGlobalStyles({
  ':root': { colorScheme: 'light' },
  '[data-theme=dark]': { colorScheme: 'dark' },
  '@media (prefers-reduced-motion: reduce)': {
    '*, *::before, *::after': {
      animationDuration: '0.01ms !important',
      animationIterationCount: '1 !important',
      transitionDuration: '0.01ms !important',
      scrollBehavior: 'auto !important',
    },
  },
});

export const bangumiPreset = definePreset({
  name: 'bangumi',
  conditions: {
    extend: {
      light: '[data-theme=light] &',
      dark: '[data-theme=dark] &',
    },
  },
  theme: {
    extend: {
      breakpoints,
      tokens: {
        colors,
        fonts,
        fontSizes,
        fontWeights,
        lineHeights,
        spacing,
        sizes,
        radii,
        borderWidths,
        shadows,
        durations,
        easings,
      },
      semanticTokens: {
        colors: semanticColors,
      },
      textStyles,
    },
  },
  globalCss,
});
