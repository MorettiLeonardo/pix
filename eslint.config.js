import pluginJs from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
    {
        files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
        ignores: ['node_modules/', 'dist/', 'build/'],
    },
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
    },
    pluginJs.configs.recommended,
    {
        rules: {
            'no-console': 'warn',
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'no-process-exit': 'error',
            'prefer-const': 'error',
        },
    },
    eslintConfigPrettier,
]
