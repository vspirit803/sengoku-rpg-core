module.exports = {
    parser: '@typescript-eslint/parser',
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    plugins: ['jest', 'simple-import-sort'],
    extends: ['standard', 'typescript'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-unused-vars': 'off',
        'space-before-function-paren': 'off',
        // 'block-spacing': 'off',
        'spaced-comment': 'off',
        'comma-dangle': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        // 'no-eval': 'off',
        // 'computed-property-even-spacing': 'off',
        // 'standard/computed-property-even-spacing': 'off'
        'simple-import-sort/sort': 'error',
    },
};
