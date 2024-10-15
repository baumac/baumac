import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    ignores: ['**/*.js', '*/*.d.ts', '**/node_modules/*'],
  },
  ...compat.extends('plugin:@typescript-eslint/recommended', 'prettier-standard'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
      'simple-import-sort': simpleImportSort,
      'no-relative-import-paths': noRelativeImportPaths,
      'unused-imports': unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        NodeJS: true,
      },

      ecmaVersion: 5,
      sourceType: 'commonjs',

      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      'no-use-before-define': 'off',
      'no-useless-constructor': 'off',
      'no-unused-vars': 'off',
      'no-new': 'off',
      'no-void': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-meaningless-void-operator': 'error',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],

      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],

      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          printWidth: 100,
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
        },
      ],

      'simple-import-sort/exports': 'error',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
            ],
            ['^\\w'],
            ['^\\u0000'],
            ['^@common/', '^@core/', '^@test-utils/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],

      'import/no-anonymous-default-export': [
        'error',
        {
          allowArrowFunction: true,
          allowAnonymousFunction: true,
        },
      ],

      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: true,
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts'],

    rules: {
      'import/first': 'off',
    },
  },
]
