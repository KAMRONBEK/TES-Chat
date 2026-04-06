import js from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      boundaries,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'app/**/*' },
        { type: 'application', pattern: 'src/application/**/*' },
        { type: 'processes', pattern: 'src/processes/**/*' },
        { type: 'pages', pattern: 'src/pages/**/*' },
        { type: 'widgets', pattern: 'src/widgets/**/*' },
        { type: 'features', pattern: 'src/features/**/*' },
        { type: 'entities', pattern: 'src/entities/**/*' },
        { type: 'shared', pattern: 'src/shared/**/*' },
      ],
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: { type: 'app' }, allow: { to: { type: ['pages', 'application', 'shared'] } } },
            {
              from: { type: 'application' },
              allow: { to: { type: ['application', 'entities', 'shared'] } },
            },
            {
              from: { type: 'processes' },
              allow: { to: { type: ['processes', 'features', 'entities', 'shared', 'application'] } },
            },
            {
              from: { type: 'pages' },
              allow: { to: { type: ['pages', 'widgets', 'features', 'entities', 'shared'] } },
            },
            {
              from: { type: 'widgets' },
              allow: { to: { type: ['widgets', 'features', 'entities', 'shared', 'application'] } },
            },
            {
              from: { type: 'features' },
              allow: { to: { type: ['features', 'entities', 'shared', 'application'] } },
            },
            { from: { type: 'entities' }, allow: { to: { type: ['entities', 'shared'] } } },
            { from: { type: 'shared' }, allow: { to: { type: ['shared'] } } },
          ],
        },
      ],
      'import/no-unresolved': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
    },
  },
  {
    files: ['app/_layout.tsx'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: ['node_modules/**', '.expo/**', 'dist/**', 'babel.config.js'],
  }
);
