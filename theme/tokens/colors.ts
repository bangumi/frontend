import { defineTokens } from '@pandacss/dev';

/**
 * 原始色阶
 * 仅供 semanticTokens 引用，业务组件不得直接使用。
 */
export const colors = defineTokens.colors({
  brand: {
    50: { value: '#FFF5F7' },
    100: { value: '#FDE8EC' },
    300: { value: '#F8B8C0' },
    500: { value: '#F09199' },
    600: { value: '#E47D87' },
    700: { value: '#D26874' },
    900: { value: '#3D2028' },
    950: { value: '#2A1117' },
  },
  blue: {
    50: { value: '#f0faff' },
    100: { value: '#dbf3ff' },
    200: { value: '#b3e3ff' },
    300: { value: '#8ad0ff' },
    400: { value: '#61baff' },
    500: { value: '#369cf8' },
    600: { value: '#247ad1' },
    700: { value: '#155bab' },
    800: { value: '#093f85' },
    900: { value: '#06295e' },
  },
  cyan: {
    50: { value: '#DCF2F5' },
    100: { value: '#95DDE8' },
    200: { value: '#69C8DB' },
    300: { value: '#42B2CF' },
    400: { value: '#1F9CC2' },
    500: { value: '#0084B4' },
    600: { value: '#00648F' },
    700: { value: '#004669' },
    800: { value: '#002A42' },
    900: { value: '#00111C' },
  },
  green: {
    400: { value: '#72D39B' },
    700: { value: '#237A4B' },
  },
  amber: {
    300: { value: '#FFCA75' },
    700: { value: '#9A5A00' },
  },
  red: {
    400: { value: '#FF8C9D' },
    700: { value: '#B4233D' },
  },
});
