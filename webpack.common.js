// fml
module.exports = function (defaultConfig) {
  return {
    ...defaultConfig,

    // HACK: https://github.com/react-dnd/react-dnd/issues/1566#issuecomment-555100635
    externals: ['react', 'react-dom', ...defaultConfig.externals],

    // HACK: to be explicit with our babel-loader configs
    module: {
      ...defaultConfig.module,
      rules: defaultConfig.module.rules.map((rule) => {
        if (rule == null || rule.use == null) return rule
        if (rule.use.loader !== 'babel-loader') return rule
        return {
          ...rule,
          test: /\.(js|ts|tsx)$/,
          use: {
            ...rule.use,
            options: {
              plugins: [
                rule.use.options.plugins[0],
                // [require.resolve('babel-plugin-graphql-tag')],
              ],
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
    },

    // to add .ts and .tsx to the resolved extensions
    resolve: {
      ...defaultConfig.resolve,
      extensions: ['.js', '.json', '.node', '.ts', '.tsx'],
    },
  }
}
