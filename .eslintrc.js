// .eslintrc.js
const eslintrc = {
  parser: '@typescript-eslint/parser', // 使用 ts 解析器
  extends: [
    'eslint:recommended', // eslint 推荐规则
    'plugin:@typescript-eslint/recommended', // ts 推荐规则
  ],
  plugins: [
    '@typescript-eslint'
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  globals: {
    rft: true,
    VueRouter: true,
    Vue: true,
    routes: true
  },
  rules: {
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],
    'no-unused-vars': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
  }, // 自定义
};

module.exports = eslintrc;
