/* eslint-env node */

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: '*.(ts,tsx)',
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['simple-import-sort', 'sort-keys-fix'],
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  rules: {
    // import sort
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',

    // sort keys
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
  /* eslint-enable sort-keys-fix/sort-keys-fix */
  settings: {
    linkComponents: [{ linkAttribute: 'href', name: 'Link' }],
    react: {
      version: 'detect',
    },
  },
}