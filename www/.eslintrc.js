module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true
  },
  ignorePatterns: ['node_modules'],
  extends: [
    'airbnb-base',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  settings: {
    'import/resolver': 'webpack'
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off'
  }
}
