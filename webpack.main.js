/* eslint-env node */

const webpack = require('webpack')

const commonWebpackConfig = require('./webpack.common')

module.exports = function (defaultConfig) {
  const commonConfig = commonWebpackConfig(defaultConfig)

  return {
    ...commonConfig,
    plugins: [
      ...defaultConfig.plugins,
      new webpack.ExternalsPlugin('commonjs', ['leveldown']),
    ],
  }
}
