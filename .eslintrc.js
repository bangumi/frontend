module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['standard-with-typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {},
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['standard-with-typescript', 'standard-jsx', 'standard-react', 'prettier'],
      parser: '@typescript-eslint/parser',
      plugins: ['react', '@typescript-eslint', 'jest'],
      parserOptions: {
        project: './tsconfig.json',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/no-implicit-any-catch': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        // 限制了一些不需要显示指明类型的场景，比如自动推导，导致了一些多余代码
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/jsx-closing-tag-location': 'off',
      },
    },
    {
      files: ['*.tsx'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
};
