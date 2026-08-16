import { defineTokens } from '@pandacss/dev';

export const fonts = defineTokens.fonts({
  bgmSans: {
    value: [
      '"SF Pro SC"',
      '"PingFang SC"',
      '"Hiragino Sans GB"',
      '"Microsoft YaHei UI"',
      '"Noto Sans CJK SC"',
      '"Noto Sans JP"',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ],
  },
  mono: {
    value: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace'],
  },
});

export const fontSizes = defineTokens.fontSizes({
  meta: { value: '12px' },
  bodySm: { value: '13px' },
  body: { value: '14px' },
  bodyLg: { value: '16px' },
  label: { value: '14px' },
  titleSm: { value: '16px' },
  sectionTitle: { value: '18px' },
  title: { value: '20px' },
  display: { value: '28px' },
});

export const lineHeights = defineTokens.lineHeights({
  meta: { value: '18px' },
  bodySm: { value: '20px' },
  body: { value: '22px' },
  bodyLg: { value: '26px' },
  label: { value: '20px' },
  titleSm: { value: '24px' },
  sectionTitle: { value: '26px' },
  title: { value: '28px' },
  display: { value: '36px' },
});

export const fontWeights = defineTokens.fontWeights({
  /** 资料页分区标题使用的轻字重。 */
  section: { value: '300' },
  /** 标题专用字重，介于 semibold 与 bold 之间。 */
  title: { value: '700' },
});
