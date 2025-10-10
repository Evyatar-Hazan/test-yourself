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
  // Discourage inline styles; prefer styled-components (warn-level during migration)
  'react/forbid-dom-props': ['warn', { forbid: ['style'] }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external', 'internal']],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'prettier/prettier': ['error'],
      // Enforce using our typed translation hook instead of react-i18next directly
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-i18next',
              importNames: ['useTranslation'],
              message:
                'Use useTranslationTyped from src/hooks/useTranslationTyped instead of useTranslation from react-i18next.',
            },
          ],
        },
      ],
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
  // Enforce styled-components are only defined/used in dedicated style files
  // Allowed style file patterns: *.styles.ts(x) or *.styled.ts(x)
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: [
      'src/**/*.styles.ts',
      'src/**/*.styles.tsx',
      'src/**/*.styled.ts',
      'src/**/*.styled.tsx',
    ],
    rules: {
      // Block importing styled-components in non-style files
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'styled-components',
              message:
                'Use styled-components only in a separate style file (*.styles.ts[x] or *.styled.ts[x]).',
            },
          ],
        },
      ],
      // Also block creating styled.* tagged templates in non-style files
      'no-restricted-syntax': [
        'error',
        {
          selector: "TaggedTemplateExpression[tag.object.name='styled']",
          message:
            'Define styled components only in a separate style file (*.styles.ts[x] or *.styled.ts[x]).',
        },
        {
          selector: "TaggedTemplateExpression[tag.callee.name='styled']",
          message:
            'Define styled components only in a separate style file (*.styles.ts[x] or *.styled.ts[x]).',
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
      // Allow inline styles in stories/demo environments
      'react/forbid-dom-props': 'off',
    },
  },
  {
    files: ['src/**/*.d.ts', 'src/theme/**/*.{ts,tsx}'],
    rules: {
      // Allow styled-components in theme and type declaration files
      'no-restricted-imports': 'off',
      'no-restricted-syntax': 'off',
      'i18next/no-literal-string': 'off',
    },
  },
  {
    files: [
      'src/**/*.styles.{ts,tsx}',
      'src/**/*.styled.{ts,tsx}',
    ],
    rules: {
      // Allow styled-components here
      'no-restricted-imports': 'off',
      'no-restricted-syntax': 'off',
      // Style files can have literal strings for CSS values
      'i18next/no-literal-string': 'off',
    },
  },
  {
    files: ['src/hooks/useTranslationTyped.ts'],
    rules: {
      // Allow the wrapper itself to import from react-i18next
      'no-restricted-imports': 'off',
    },
  },
];
