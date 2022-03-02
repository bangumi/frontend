const { dirname } = require("path")
const reactDocgenTypescript = require("@joshwooding/vite-plugin-react-docgen-typescript").default

module.exports = {
  "stories": [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  "framework": "@storybook/react",
  viteFinal: async (viteConfig) => {
    // workaround for vite build
    // Refs: https://github.com/eirslett/storybook-builder-vite/issues/55#issuecomment-871800293
    viteConfig.root = dirname(require.resolve("storybook-builder-vite"))
    /*
    * About auto-generated component docs:
    * Please use FC<Props> instead of React.FC<Props> to declare component.
    * https://github.com/styleguidist/react-docgen-typescript/issues/323
    * https://github.com/styleguidist/react-docgen-typescript/issues/393
    * */
    viteConfig.plugins.push(reactDocgenTypescript())
    /* WIP: Temporary patch for style */
    viteConfig.plugins.push({
      transform(source, id) {
        if (id.endsWith('.stories.tsx')) {
          return `${source}
          import './style'`
        }
      }
    })
    return viteConfig
  },
  core: {
    builder: 'storybook-builder-vite',
  },
}