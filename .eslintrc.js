module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    extends: 'standard',
    plugins: [
        'html'
    ],
    'rules': {
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'semi' : ['error','always'],
        'indent': [2, 4, { 'SwitchCase': 1 }],
        'space-before-function-paren': 0
    }
}
