import { defineConfig } from '@pandacss/dev';

import { bangumiPreset } from './theme/preset';

export default defineConfig({
  preflight: false,
  presets: ['@pandacss/preset-panda', bangumiPreset],
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
});
