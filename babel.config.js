// storybook 需要 babel 加载配置文件
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    '@babel/preset-react',
    'babel-preset-vite',
  ],
};
