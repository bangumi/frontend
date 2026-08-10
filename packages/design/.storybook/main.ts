import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

export default {
  stories: [
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../../icons/index.stories.tsx',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (viteConfig) => {
    if (!viteConfig.build) {
      viteConfig.build = { sourcemap: true };
    } else {
      viteConfig.build.sourcemap = true;
    }

    // Compile less in the main thread instead of worker threads: Vite's CSS
    // preprocessor workers wait on a 5s synchronous lock for the main process
    // to resolve imports, which intermittently times out
    // ("[vite:css] [less] timed-out") on CPU-contended CI runners.
    viteConfig.css ??= {};
    viteConfig.css.preprocessorMaxWorkers = 0;

    /*
     * About auto-generated component docs:
     * Please use FC<Props> instead of React.FC<Props> to declare component.
     * https://github.com/styleguidist/react-docgen-typescript/issues/323
     * https://github.com/styleguidist/react-docgen-typescript/issues/393
     * */
    viteConfig.plugins ??= [];

    viteConfig.plugins.push(
      svgr({
        include: '**/*.svg',
        svgrOptions: {
          exportType: 'named',
          namedExport: 'ReactComponent',
        },
      }),
    );
    return viteConfig;
  },
} satisfies StorybookConfig;
