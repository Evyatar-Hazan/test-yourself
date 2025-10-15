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
      // Enforce using theme-based colors only (no hard-coded color literals)
      // Allowed: theme.colors.*, CSS variables (var(--...)), keywords like transparent/currentColor
      // Disallowed: hex colors (#fff/#ffffff/#ffffffff), rgb()/rgba(), hsl()/hsla() in styled-components, JSX style objects, or JSX color-ish attributes
      'no-restricted-syntax': [
        'error',
        // styled-components: styled.tag`...` — ban hex/rgb/hsl inside the template
        {
          selector:
            "TaggedTemplateExpression[tag.object.name='styled'] TemplateElement[value.raw=/(?:#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6,8})\b|\\brgba?\\b|\\bhsla?\\b)/i]",
          message:
            'Do not hard-code colors in styled-components. Use theme.colors.* or CSS variables.',
        },
        // styled-components: also disallow bare named colors for color-like properties
        {
          selector:
            "TaggedTemplateExpression[tag.object.name='styled'] TemplateElement[value.raw=/(?:\\b(?:color|background(?:-color)?|border-color|outline-color|fill|stroke|stop-color)\\s*:\\s*)(?!var\\(|transparent\\b|currentColor\\b|inherit\\b|initial\\b|unset\\b|revert\\b|none\\b)([A-Za-z]+)\\s*(?:;|$)/i]",
          message:
            'Use theme.colors.* (or CSS variables). Bare CSS color keywords are not allowed.',
        },
        // styled-components: styled('div')`...`
        {
          selector:
            "TaggedTemplateExpression[tag.callee.name='styled'] TemplateElement[value.raw=/(?:#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6,8})\b|\\brgba?\\b|\\bhsla?\\b)/i]",
          message:
            'Do not hard-code colors in styled-components. Use theme.colors.* or CSS variables.',
        },
        {
          selector:
            "TaggedTemplateExpression[tag.callee.name='styled'] TemplateElement[value.raw=/(?:\\b(?:color|background(?:-color)?|border-color|outline-color|fill|stroke|stop-color)\\s*:\\s*)(?!var\\(|transparent\\b|currentColor\\b|inherit\\b|initial\\b|unset\\b|revert\\b|none\\b)([A-Za-z]+)\\s*(?:;|$)/i]",
          message:
            'Use theme.colors.* (or CSS variables). Bare CSS color keywords are not allowed.',
        },
        // styled-components css helper: css`...`
        {
          selector:
            "TaggedTemplateExpression[tag.name='css'] TemplateElement[value.raw=/(?:#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6,8})\b|\\brgba?\\b|\\bhsla?\\b)/i]",
          message:
            'Do not hard-code colors in CSS templates. Use theme.colors.* or CSS variables.',
        },
        {
          selector:
            "TaggedTemplateExpression[tag.name='css'] TemplateElement[value.raw=/(?:\\b(?:color|background(?:-color)?|border-color|outline-color|fill|stroke|stop-color)\\s*:\\s*)(?!var\\(|transparent\\b|currentColor\\b|inherit\\b|initial\\b|unset\\b|revert\\b|none\\b)([A-Za-z]+)\\s*(?:;|$)/i]",
          message:
            'Use theme.colors.* (or CSS variables). Bare CSS color keywords are not allowed.',
        },
        // Inline style objects in JSX: style={{ color: '#fff' }}
        {
          selector:
            "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name=/^(?:color|background|backgroundColor|borderColor|outlineColor|fill|stroke|stopColor)$/] > Literal[value=/(?:#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6,8})\b|\\brgba?\\b|\\bhsla?\\b)/i]",
          message:
            'Do not hard-code colors in inline styles. Use theme.colors.* or CSS variables.',
        },
        // Inline style objects: block named colors too (e.g., 'red')
        {
          selector:
            "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name=/^(?:color|background|backgroundColor|borderColor|outlineColor|fill|stroke|stopColor)$/] > Literal[value=/^(?!transparent$|currentColor$|inherit$|var\\().+[a-zA-Z].*$/]",
          message:
            'Inline style must not use named colors. Use theme.colors.* or CSS variables.',
        },
        // JSX color-like attributes directly: <svg fill="#fff" /> or color="#fff"
        {
          selector:
            "JSXAttribute[name.name=/^(?:color|fill|stroke|stopColor)$/] > Literal[value=/(?:#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6,8})\b|\\brgba?\\b|\\bhsla?\\b)/i]",
          message:
            'Do not hard-code colors in JSX attributes. Use theme.colors.* or CSS variables.',
        },
        {
          selector:
            "JSXAttribute[name.name=/^(?:color|fill|stroke|stopColor)$/] JSXExpressionContainer > Literal[value=/(?:#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6,8})\b|\\brgba?\\b|\\bhsla?\\b)/i]",
          message:
            'Do not hard-code colors in JSX attributes. Use theme.colors.* or CSS variables.',
        },
        {
          selector:
            "JSXAttribute[name.name=/^(?:color|fill|stroke|stopColor)$/] > Literal[value=/^(?!transparent$|currentColor$|inherit$|var\\().+[a-zA-Z].*$/]",
          message:
            'Do not use named colors in JSX attributes. Use theme.colors.* or CSS variables.',
        },
        {
          selector:
            "JSXAttribute[name.name=/^(?:color|fill|stroke|stopColor)$/] JSXExpressionContainer > Literal[value=/^(?!transparent$|currentColor$|inherit$|var\\().+[a-zA-Z].*$/]",
          message:
            'Do not use named colors in JSX attributes. Use theme.colors.* or CSS variables.',
        },
      ],
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
      // Allow color literals in token definition files
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
