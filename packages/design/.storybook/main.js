const { dirname } = require("path");

module.exports = {
  "stories": [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/react",
  viteFinal: async (viteConfig) => {
    // workaround for vite build
    // Refs: https://github.com/eirslett/storybook-builder-vite/issues/55#issuecomment-871800293
    viteConfig.root = dirname(require.resolve("storybook-builder-vite"))
    return viteConfig
  },
  core: {
    builder: 'storybook-builder-vite',
  },
}