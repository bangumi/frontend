/* Todo: Use https://vitest.dev/ */
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    '@babel/preset-react',
    "babel-preset-vite"
  ]
}
