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
    /** 正文、主标题和需要快速定位的区块标题。 */
    primary: { value: { base: '{colors.gray.950}', _dark: '{colors.gray.100}' } },
    /** 次级正文与常规元数据；不用于未选中导航或 Tabs。 */
    secondary: { value: { base: '{colors.gray.500}', _dark: '{colors.gray.300}' } },
    /** 仅用于非关键的辅助说明，不能单独承载重要信息或可操作入口。 */
    tertiary: { value: { base: '{colors.gray.400}', _dark: '{colors.gray.400}' } },
    /** 仅用于不可操作的禁用控件文本，不可作为普通的弱化文本。 */
    disabled: { value: { base: '{colors.gray.400}', _dark: '{colors.gray.600}' } },
  },
  border: {
    subtle: { value: { base: '{colors.gray.200}', _dark: '{colors.gray.700}' } },
    DEFAULT: { value: { base: '{colors.gray.300}', _dark: '{colors.gray.600}' } },
    strong: { value: { base: '{colors.gray.400}', _dark: '{colors.gray.500}' } },
  },
  link: {
    DEFAULT: { value: { base: '{colors.cyan.500}', _dark: '{colors.cyan.500}' } },
    subtle: { value: { base: '{colors.gray.500}', _dark: '{colors.gray.500}' } },
    hover: { value: { base: '{colors.cyan.400}', _dark: '{colors.cyan.400}' } },
  },
  nav: {
    /** 未选中导航与 Tabs 的默认文本色。 */
    DEFAULT: { value: { base: '{colors.gray.400}', _dark: '{colors.gray.400}' } },
    /** 导航与 Tabs 的 hover 文本色；焦点态仍须同时提供 focusRing。 */
    hover: { value: { base: '{colors.blue.500}', _dark: '{colors.blue.500}' } },
    /** 当前导航项的强调色；同时提供 aria-current、指示线或填充等非颜色线索。 */
    active: { value: { base: '{colors.brand.500}', _dark: '{colors.brand.500}' } },
    activeHover: { value: { base: '{colors.brand.600}', _dark: '{colors.brand.600}' } },
  },
  info: { value: { base: '{colors.blue.700}', _dark: '{colors.blue.400}' } },
  success: { value: { base: '{colors.green.700}', _dark: '{colors.green.400}' } },
  warning: { value: { base: '{colors.amber.700}', _dark: '{colors.amber.300}' } },
  danger: { value: { base: '{colors.red.700}', _dark: '{colors.red.400}' } },
  focusRing: { value: { base: '{colors.cyan.700}', _dark: '{colors.cyan.300}' } },
});
