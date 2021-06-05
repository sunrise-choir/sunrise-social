const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// fml

const extensions = ['.js', '.json', '.node', '.ts', '.tsx', '.graphql']

module.exports = function (defaultConfig) {
  return {
    ...defaultConfig,

    // HACK: https://github.com/react-dnd/react-dnd/issues/1566#issuecomment-555100635
    externals: ['react', 'react-dom', ...defaultConfig.externals],

    module: {
      ...defaultConfig.module,

      // overwrite babel loader to:
      // - include TypeScript
      // - be more specific with configurations
      rules: [
        ...defaultConfig.module.rules.map((rule) => {
          if (rule == null || rule.use == null) return rule
          if (rule.use.loader !== 'babel-loader') return rule
          return {
            ...rule,
            test: /\.(js|ts|tsx)$/,
            use: {
              ...rule.use,
              options: {
                plugins: [rule.use.options.plugins[0]],
                presets: [
                  rule.use.options.presets[0],
                  [require.resolve('@babel/preset-react')],
                  [
                    require.resolve('@babel/preset-typescript'),
                    {
                      allExtensions: true,
                      isTSX: true,
                    },
                  ],
                ],
              },
            },
          }
        }),
        {
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
          test: /\.graphql$/,
        },
      ],
    },

    // to add .ts and .tsx to the resolved extensions
    resolve: {
      ...defaultConfig.resolve,
      extensions,
      plugins: [
        // to add aliases that match the tsconfig.json paths
        new TsconfigPathsPlugin({ extensions }),
      ],
    },
  }
}
