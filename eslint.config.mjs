import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import unicornPlugin from 'eslint-plugin-unicorn';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));

const allLintFiles = ['**/*.{js,cjs,mjs,jsx,ts,mts,cts,tsx}'];
const tsFiles = ['**/*.{ts,mts,cts,tsx}'];
const jsxFiles = ['**/*.{jsx,tsx}'];
const tsxFiles = ['**/*.tsx'];

export default [
  {
    ignores: [
      '**/packages/design/storybook-static/**',
      '**/packages/client/types/**',
      '**/packages/client/client.ts',
      '**/node_modules/**',
      '**/dist/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: tsFiles,
  })),
  {
    files: tsFiles,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir,
      },
    },
  },
  {
    files: allLintFiles,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      unicorn: unicornPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    settings: {
      'import/internal-regex': '^@bangumi/',
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.mts', '.cts', '.tsx'],
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
      curly: 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-else-return': ['error', { allowElseIf: false }],
      'unused-imports/no-unused-imports': 'error',

      'unicorn/prefer-node-protocol': 'error',

      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'error',
      'import/order': 'off',
      'no-useless-assignment': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000'], ['^node:'], ['^'], ['^@bangumi/.*'], ['^\\.\\.', '^\\.']],
        },
      ],
    },
  },
  {
    files: tsFiles,
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: true,
          allowNumber: true,
          allowNullableNumber: true,
          allowNullableString: true,
          allowNullableBoolean: true,
          allowNullableObject: true,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    },
  },
  {
    files: jsxFiles,
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/jsx-closing-tag-location': 'off',
    },
  },
  {
    files: tsxFiles,
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ['**/*.spec.tsx', '**/*.test.tsx', '**/*.stories.tsx'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
      '@typescript-eslint/consistent-type-assertions': 'off',
    },
  },
  eslintConfigPrettier,
];
