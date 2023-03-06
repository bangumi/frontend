import { dirname } from 'node:path';

import type { StorybookViteConfig } from '@storybook/builder-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookViteConfig = {
  stories: [
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../../icons/index.stories.tsx',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  viteFinal: (viteConfig) => {
    if (!viteConfig.build) {
      viteConfig.build = { sourcemap: true };
    } else {
      viteConfig.build.sourcemap = true;
    }

    // workaround for vite build
    // Refs: https://github.com/eirslett/storybook-builder-vite/issues/55#issuecomment-871800293
    viteConfig.root = dirname(require.resolve('@storybook/builder-vite'));
    /*
     * About auto-generated component docs:
     * Please use FC<Props> instead of React.FC<Props> to declare component.
     * https://github.com/styleguidist/react-docgen-typescript/issues/323
     * https://github.com/styleguidist/react-docgen-typescript/issues/393
     * */
    viteConfig.plugins ??= [];

    viteConfig.plugins.push(svgr());
    return viteConfig;
  },
  core: {
    builder: '@storybook/builder-vite',
  },
};
export default config;
