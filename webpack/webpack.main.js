const webpack = require('webpack')
const { join } = require('path')
// const builtinModules = require('builtin-modules')
const electronVersion = require('electron/package.json')
  .version.split('.')
  .slice(1)
  .join('.')

const cwd = process.cwd()

const electronConfig = require('./webpack.electron')

module.exports = {
  ...electronConfig,
  entry: join(cwd, 'src/main.ts'),
  externals: [
    {
      bufferutil: 'commonjs bufferutil',
      // https://github.com/slackapi/node-slack-sdk/issues/746#issuecomment-778804407
      'utf-8-validate': 'commonjs utf-8-validate',
    },
  ],
  output: {
    filename: 'main.js',
    path: join(cwd, 'dist'),
  },
  plugins: [
    ...(electronConfig.plugins || []),
    new webpack.ExternalsPlugin('commonjs', ['leveldown']),
  ],
  target: `electron${electronVersion}-main`,
}
