module.exports = {
  '**/*': 'prettier --write --ignore-unknown',
  '**/*.{js,ts,tsx}': ['eslint --cache --fix', 'prettier --write'],
  '**/*.{ts,tsx}': () => 'tsc -p tsconfig.json --noEmit',
}
