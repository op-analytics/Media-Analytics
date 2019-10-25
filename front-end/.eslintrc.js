/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'eslint:recommended', 'plugin:react/recommended','prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-underscore-dangle': 0,
    'arrow-parens': 0,
    'no-tabs': 'error',
    'import/prefer-default-export': 0,
  },
}
