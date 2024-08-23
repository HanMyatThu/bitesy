module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', '@rocketseat/eslint-config/react', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs', "src/components/ui/*"],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {

  },
}
