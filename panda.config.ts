import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: false,
  include: [
    './packages/website/src/**/*.{js,jsx,ts,tsx}',
    './packages/design/components/**/*.{js,jsx,ts,tsx}',
    './packages/design/*.{js,jsx,ts,tsx}',
    './packages/icons/*.{js,jsx,ts,tsx}',
  ],
  exclude: [],
  outdir: 'packages/styled-system',
  importMap: '@bangumi/styled-system',
  jsxFramework: 'react',
  theme: {
    extend: {
      tokens: {
        colors: {
          /* 与原 PHP 站点（Bangumi/less/common/variables.less）对齐的站点调色板 */
          bgmPrimary: { value: '#F09199' },
          bgmBlue: { value: '#369CF8' },
          bgmLink: { value: '#0084B4' },
          bgmLinkHover: { value: '#02A3FB' },
          bgmNavBg: { value: '#FCFCFC' },
          bgmNavBgEnd: { value: '#FAFAF9' },
          bgmNavBorder: { value: '#DDDDDD' },
          bgmNavText: { value: '#777777' },
          bgmNavMenuBgStart: { value: '#F5F5F5' },
          bgmNavMenuBgEnd: { value: '#F1F1F1' },
          bgmDropBg: { value: 'rgba(254, 254, 254, 0.9)' },
          bgmDropBorder: { value: '#EEEEEE' },
          bgmTextTip: { value: '#999999' },
          bgmFooterBg: { value: '#F8F8F8' },
          bgmFooterText: { value: '#AAAAAA' },
          bgmFooterLink: { value: '#777777' },
          bgmFooterLinkHover: { value: '#333333' },
          bgmBorder: { value: '#EEEEEE' },
          bgmBorderMedium: { value: '#CCCCCC' },
        },
      },
    },
  },
});
