module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    // 'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    __static: true,
  },
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
    react: {
      version: 'detect',
    },
  },
}
