import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      eqeqeq: 'error',
      curly: 'error',
      'no-eval': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },
];
