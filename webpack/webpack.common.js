const { join } = require('path')

module.exports = {
  module: {
    rules: [
      // Babel loader (including TypeScript)
      {
        exclude: /node_modules/,
        test: /\.(js|ts|tsx)$/,
        use: 'babel-loader',
      },
      // GraphQL loader
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: 'graphql-tag/loader',
      },
      // Image loader
      {
        test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg)$/,
        type: 'asset/resource',
      },
      // Font & SVG loader
      {
        test: /\.(woff(2)?|ttf|otf|eot)$/,
        type: 'asset/resource',
      },
      // Html loader
      {
        test: /\.html$/,
        type: 'asset/resource',
      },
    ],
  },

  resolve: {
    alias: {
      '@': join(__dirname, '../src'),
    },
    extensions: ['.js', '.ts', '.tsx', '.json', '.node', '.graphql'],
  },
}
