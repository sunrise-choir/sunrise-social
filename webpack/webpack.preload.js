const { join } = require('path')
const electronVersion = require('electron/package.json')
  .version.split('.')
  .slice(1)
  .join('.')

const cwd = process.cwd()

const electronConfig = require('./webpack.electron')

module.exports = {
  ...electronConfig,
  // devtool: 'source-map',
  entry: join(cwd, 'src/preload.ts'),
  output: {
    filename: 'preload.js',
    path: join(cwd, 'dist'),
  },
  target: `electron${electronVersion}-preload`,
}
