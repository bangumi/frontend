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
    fg: { value: { base: '{colors.white}', _dark: '{colors.white}' } },
  },
  bg: {
    canvas: { value: { base: '{colors.white}', _dark: '{colors.gray.950}' } },
    subtle: { value: { base: '{colors.gray.50}', _dark: '{colors.gray.900}' } },
    muted: { value: { base: '{colors.gray.100}', _dark: '{colors.gray.800}' } },
    raised: { value: { base: '{colors.white}', _dark: '{colors.gray.800}' } },
    inset: { value: { base: '{colors.gray.100}', _dark: '{colors.gray.950}' } },
  },
  text: {
    primary: { value: { base: '{colors.gray.900}', _dark: '{colors.gray.100}' } },
    secondary: { value: { base: '{colors.gray.700}', _dark: '{colors.gray.300}' } },
    tertiary: { value: { base: '{colors.gray.400}', _dark: '{colors.gray.400}' } },
    disabled: { value: { base: '{colors.gray.400}', _dark: '{colors.gray.600}' } },
  },
  border: {
    subtle: { value: { base: '{colors.gray.200}', _dark: '{colors.gray.700}' } },
    DEFAULT: { value: { base: '{colors.gray.300}', _dark: '{colors.gray.600}' } },
    strong: { value: { base: '{colors.gray.400}', _dark: '{colors.gray.500}' } },
  },
  link: {
    DEFAULT: { value: { base: '{colors.cyan.500}', _dark: '{colors.cyan.500}' } },
    hover: { value: { base: '{colors.cyan.600}', _dark: '{colors.cyan.600}' } },
  },
  nav: {
    DEFAULT: { value: { base: '{colors.gray.400}', _dark: '{colors.gray.400}' } },
    hover: { value: { base: '{colors.blue.500}', _dark: '{colors.blue.500}' } },
    active: { value: { base: '{colors.brand.500}', _dark: '{colors.brand.500}' } },
    activeHover: { value: { base: '{colors.brand.600}', _dark: '{colors.brand.600}' } },
  },
  info: { value: { base: '{colors.blue.700}', _dark: '{colors.blue.400}' } },
  success: { value: { base: '{colors.green.700}', _dark: '{colors.green.400}' } },
  warning: { value: { base: '{colors.amber.700}', _dark: '{colors.amber.300}' } },
  danger: { value: { base: '{colors.red.700}', _dark: '{colors.red.400}' } },
  focusRing: { value: { base: '{colors.cyan.700}', _dark: '{colors.cyan.300}' } },
});
