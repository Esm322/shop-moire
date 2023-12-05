module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'jsx-ally/label-has-associated-control' : 'off',
    'vuejs-accessibility/label-has-for' : 'off',
    "arrow-body-style": "off",
    'no-return-assign': 'off',
    'max-len': 'off',
    'dot-notation': 'off',
    // 'import/prefer-default-export': 'off',
    'object-shorthand': 'off',
    'prefer-destructuring': 'off',
    'consistent-return': 'off',
    'no-restricted-syntax': 'off',
    // 'vuejs-accessibility/click-events-have-key-events': 'off',
  },
};
