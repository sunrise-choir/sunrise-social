const { join } = require('path')

const cwd = process.cwd()

const commonConfig = require('./webpack.common')

module.exports = {
  ...commonConfig,
  // default is eval, which breaks CSP (Content-Security-Policy)
  devtool: 'source-map',
  entry: join(cwd, 'src/renderer.tsx'),
  output: {
    filename: 'renderer.js',
    path: join(cwd, 'dist'),
  },
  target: 'web',
}
