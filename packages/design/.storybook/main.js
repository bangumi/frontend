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
  webpackFinal: async (webpackConfig, {configType}) => {
    webpackConfig.module.rules.push({
      test: /.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    })

    return webpackConfig
  },
  core: {
    builder: 'webpack5',
  },
}