import { dirname } from 'path'
import reactDocgenTypescript from '@joshwooding/vite-plugin-react-docgen-typescript'
import type { StorybookConfig } from '@storybook/react/types'
import type { UserConfig, PluginOption } from 'vite'
import svgr from 'vite-plugin-svgr'

const config: StorybookConfig & { viteFinal: (viteConfig: UserConfig) => Promise<UserConfig> } = {
  stories: [
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../../icons/index.stories.tsx'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  framework: '@storybook/react',
  viteFinal: async (viteConfig) => {
    // workaround for vite build
    // Refs: https://github.com/eirslett/storybook-builder-vite/issues/55#issuecomment-871800293
    viteConfig.root = dirname(require.resolve('@storybook/builder-vite'))
    /*
    * About auto-generated component docs:
    * Please use FC<Props> instead of React.FC<Props> to declare component.
    * https://github.com/styleguidist/react-docgen-typescript/issues/323
    * https://github.com/styleguidist/react-docgen-typescript/issues/393
    * */
    !viteConfig.plugins && (viteConfig.plugins = [])
    viteConfig.plugins.push(reactDocgenTypescript())
    /* WIP: Temporary patch for style */
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    viteConfig.plugins.push({
      transform (source, id) {
        if (id.endsWith('.stories.tsx') && id.includes('components')) {
          return `${source}
          import './style'`
        }
        return source
      }
    } as PluginOption)

    viteConfig.plugins.push(svgr() as any)
    return viteConfig
  },
  core: {
    builder: '@storybook/builder-vite'
  }
}
export default config
