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
});
