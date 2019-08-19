module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
      "airbnb",
      "plugin:prettier/recommended"
    ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: [
      "react",
      "prettier"
    ],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-underscore-dangle": 0,
    "prettier/prettier": "error"
  },
};
