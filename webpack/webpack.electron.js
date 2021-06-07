const webpack = require('webpack')

const commonConfig = require('./webpack.common')

module.exports = {
  ...commonConfig,
  module: {
    ...commonConfig.module,
    rules: [
      ...commonConfig.module.rules,

      // Native node modules loader
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      // Webpack asset relocator loader
      {
        parser: { amd: false },
        test: /\.(m?js|node)$/,
        use: {
          loader: '@vercel/webpack-asset-relocator-loader',
          options: {
            outputAssetBase: 'native_modules',
          },
        },
      },
    ],
  },
  plugins: [
    // NOTE(mw): necessary to stop
    //   https://github.com/dominictarr/pull-fs/blob/55768e83e133ae14e3367b0e845639e801acc515/util.js#L90-L96
    //   from running... :/
    new webpack.DefinePlugin({
      'module.parent': true,
    }),
  ],
}
