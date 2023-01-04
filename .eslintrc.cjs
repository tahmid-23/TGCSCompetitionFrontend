module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    'no-constant-condition': 'off',
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true
      }
    ]
  }
};
