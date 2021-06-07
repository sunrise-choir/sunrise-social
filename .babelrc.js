const electronVersion = require('electron/package.json').version.split('.')[0]

module.exports = {
  plugins: [],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          electron: electronVersion,
        },
      },
    ],
    '@babel/preset-react',
    [
      '@babel/preset-typescript',
      {
        allExtensions: true,
        isTSX: true,
      },
    ],
  ],
}
