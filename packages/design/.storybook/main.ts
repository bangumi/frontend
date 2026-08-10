import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

export default {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)', '../../icons/index.stories.tsx'],
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

    // react-router 7 ships only its development build, whose "use client"
    // directives are ignored by Rollup and whose broken sourcemaps make
    // warning locations unresolvable; silence that third-party noise.
    viteConfig.build ??= {};
    viteConfig.build.rollupOptions ??= {};
    const originalOnwarn = viteConfig.build.rollupOptions.onwarn;
    viteConfig.build.rollupOptions.onwarn = (warning, warn) => {
      if (
        warning.id?.includes('node_modules') &&
        (warning.code === 'MODULE_LEVEL_DIRECTIVE' || warning.code === 'SOURCEMAP_ERROR')
      ) {
        return;
      }
      if (originalOnwarn) {
        originalOnwarn(warning, warn);
      } else {
        warn(warning);
      }
    };

    // The Storybook iframe bundle bundles all stories by design; raise the
    // default 500 kB threshold so the build stops warning about it.
    viteConfig.build.chunkSizeWarningLimit = 1200;

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
