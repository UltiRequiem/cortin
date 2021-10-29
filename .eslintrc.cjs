module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 2020 },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:unicorn/recommended',
    'airbnb-base',
  ],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'import/extensions': ['error', 'always', { ignorePackages: true }],
  },
};
