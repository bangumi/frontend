import { defineSemanticTokens } from '@pandacss/dev';

/**
 * 语义颜色：业务组件只使用这一层，不感知当前主题。
 * `_dark` 由 `dark` 条件（`[data-theme=dark] &`）驱动。
 */
export const semanticColors = defineSemanticTokens.colors({
  accent: {
    DEFAULT: { value: { base: '{colors.brand.500}', _dark: '{colors.brand.500}' } },
    hover: { value: { base: '{colors.brand.600}', _dark: '{colors.brand.600}' } },
    subtle: { value: { base: '{colors.brand.50}', _dark: '{colors.brand.900}' } },
    /** 强调填充之上的文字与图标。 */
    fg: { value: { base: '{colors.neutral.0}', _dark: '{colors.neutral.0}' } },
  },
  bg: {
    canvas: { value: { base: '{colors.neutral.0}', _dark: '{colors.neutral.975}' } },
    subtle: { value: { base: '{colors.neutral.50}', _dark: '{colors.neutral.950}' } },
    muted: { value: { base: '{colors.neutral.150}', _dark: '{colors.neutral.850}' } },
    raised: { value: { base: '{colors.neutral.0}', _dark: '{colors.neutral.900}' } },
    inset: { value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.1000}' } },
  },
  text: {
    primary: { value: { base: '{colors.neutral.925}', _dark: '{colors.neutral.100}' } },
    secondary: { value: { base: '{colors.neutral.700}', _dark: '{colors.neutral.350}' } },
    tertiary: { value: { base: '{colors.neutral.500}', _dark: '{colors.neutral.425}' } },
    disabled: { value: { base: '{colors.neutral.400}', _dark: '{colors.neutral.600}' } },
  },
  border: {
    subtle: { value: { base: '{colors.neutral.200}', _dark: '{colors.neutral.800}' } },
    DEFAULT: { value: { base: '{colors.neutral.300}', _dark: '{colors.neutral.750}' } },
    strong: { value: { base: '{colors.neutral.450}', _dark: '{colors.neutral.775}' } },
  },
  link: {
    DEFAULT: { value: { base: '{colors.blue.500}', _dark: '{colors.blue.500}' } },
    hover: { value: { base: '{colors.blue.600}', _dark: '{colors.blue.600}' } },
  },
  info: { value: { base: '{colors.blue.700}', _dark: '{colors.blue.400}' } },
  success: { value: { base: '{colors.green.700}', _dark: '{colors.green.400}' } },
  warning: { value: { base: '{colors.amber.700}', _dark: '{colors.amber.300}' } },
  danger: { value: { base: '{colors.red.700}', _dark: '{colors.red.400}' } },
  focusRing: { value: { base: '{colors.blue.750}', _dark: '{colors.blue.300}' } },
});
