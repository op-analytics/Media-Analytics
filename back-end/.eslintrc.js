module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
  ],
  settings:{
   'import/resolver': {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    'prettier/@typescript-eslint', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'airbnb-base',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  rules: {
    'simple-import-sort/sort': 'error',
    "sort-imports": "off",
    "import/order": "off",
    'no-underscore-dangle': 0,
    '@typescript-eslint/no-non-null-assertion':0,
    'arrow-parens': 0,
    'no-tabs': 'error',
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': 'error'
  },
};
