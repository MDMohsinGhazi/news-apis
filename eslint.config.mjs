import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import security from 'eslint-plugin-security';
import parser from '@typescript-eslint/parser';

export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            globals: globals.browser,
            parser: parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },

        plugins: {
            eslint: pluginJs.configs.recommended,
            tseslint: tseslint.configs.recommended,
            prettier: prettier.configs.recommended,
            security: security.configs.recommended,
        },

        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
        ignores: ['**/*.config.js'],
    },
];
