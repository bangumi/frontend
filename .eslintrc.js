module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['standard-with-typescript', 'prettier'],
  plugins: ['unused-imports'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  settings: {
    'import/internal-regex': '^@bangumi/',
  },
  rules: {
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
        pathGroups: [
          {
            pattern: '@bangumi/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
        groups: [
          'builtin', // Built-in types are first
          'external',
          'internal',
          ['parent', 'sibling', 'index', 'object'],
        ],
      },
    ],
  },
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
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts'],
        },
        'import/extensions': ['.js', '.ts', '.mjs'],
        'import/resolver': {
          typescript: {
            project: ['tsconfig.json'],
          },
          node: {
            project: ['tsconfig.json'],
          },
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowString: true,
            allowNumber: true,
            allowNullableNumber: true,
            allowNullableString: true,
            allowNullableBoolean: true,
          },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/no-implicit-any-catch': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
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
