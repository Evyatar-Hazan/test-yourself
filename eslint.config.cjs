// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format


const js = require('@eslint/js');
const storybook = require('eslint-plugin-storybook');
const tseslint = require('typescript-eslint');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');
const i18nextPlugin = require('eslint-plugin-i18next');

module.exports = [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'eslint.config.cjs',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier: prettierPlugin,
      i18next: i18nextPlugin,
      storybook,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external', 'internal']],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'prettier/prettier': ['error'],
      // TODO: Enforce no raw text in JSX; prefer t() for user-facing strings
      'i18next/no-literal-string': [
        'warn',
        {
          mode: 'jsx-text-only',
          markupOnly: true,
          ignoreAttributes: ['data-testid', 'to', 'href'],
        },
      ],
    },
  },
  {
    files: [
      '.storybook/**/*.{js,jsx,ts,tsx}',
      'src/**/*.stories.{js,jsx,ts,tsx}',
      'src/stories/**/*.{js,jsx,ts,tsx}',
    ],
    rules: {
      // Stories and SB config can contain literal strings for docs and demos
      'i18next/no-literal-string': 'off',
    },
  },
];
