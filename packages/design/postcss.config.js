const path = require('node:path');

module.exports = {
  // panda 插件需要基于仓库根解析 include glob；
  // Vite dev 进程的 cwd 是包目录，不传 cwd 会匹配不到任何源文件。
  plugins: [
    require('@pandacss/dev/postcss')({ cwd: path.resolve(__dirname, '../..') }),
    require('autoprefixer'),
  ],
};
