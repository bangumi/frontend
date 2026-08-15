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
  neutral: {
    0: { value: '#FFFFFF' },
    50: { value: '#F7F7F8' },
    100: { value: '#F2F3F5' },
    150: { value: '#EFEFF1' },
    200: { value: '#E4E5E8' },
    300: { value: '#C9CBD1' },
    350: { value: '#C5C7CE' },
    400: { value: '#9A9CA3' },
    425: { value: '#9B9EA8' },
    450: { value: '#979AA3' },
    500: { value: '#777982' },
    600: { value: '#6F727B' },
    700: { value: '#595B63' },
    750: { value: '#545761' },
    775: { value: '#858994' },
    800: { value: '#34373E' },
    850: { value: '#292B31' },
    900: { value: '#24262B' },
    925: { value: '#242428' },
    950: { value: '#1E2024' },
    975: { value: '#16171A' },
    1000: { value: '#111214' },
  },
  blue: {
    300: { value: '#7DCEFF' },
    400: { value: '#77BDF5' },
    500: { value: '#54B5DF' },
    600: { value: '#3FA5D2' },
    700: { value: '#1769AA' },
    750: { value: '#146EB4' },
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
