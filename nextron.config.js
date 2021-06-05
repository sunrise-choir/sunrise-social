/* eslint-env node */

const webpack = require('webpack')

module.exports = {
  webpack: (defaultConfig) => {
    return {
      ...defaultConfig,
      plugins: [
        ...defaultConfig.plugins,
        new webpack.ExternalsPlugin('commonjs', ['leveldown']),
      ],
    }
  },
}
