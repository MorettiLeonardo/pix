import pluginJs from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
    // 1. Define files to look at and files to completely ignore
    {
        files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
        ignores: ['node_modules/', 'dist/', 'build/'],
    },

    // 2. Configure the environment variables (Backend Node environment)
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module', // Use "commonjs" if you use require() instead of import
            globals: {
                ...globals.node,
                ...globals.jest, // Include this line only if you use Jest for backend testing
            },
        },
    },

    // 3. Load recommended ESLint rules
    pluginJs.configs.recommended,

    // 4. Overriding custom backend code quality rules
    {
        rules: {
            'no-console': 'warn', // Warn on console.log, ideal for production logging
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ignore unused vars starting with _ (like req, res, next)
            'no-process-exit': 'error', // Prevent abrupt server shutdowns
            'prefer-const': 'error', // Enforce immutable variable declarations
        },
    },

    // 5. Deactivate styling rules that conflict with Prettier (Must be last)
    eslintConfigPrettier,
]
