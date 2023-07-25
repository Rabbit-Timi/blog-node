module.exports = {
  root: true, // 作用的目录是根目录
  extends: ['eslint:recommended', 'plugin:prettier/recommended'], // extends 指定eslint规范
  plugins: [],
  parserOptions: {
    sourceType: '', // 按照模块的方式解析
    parser: 'babel-eslint',
  },
  parser: '@typescript-eslint/parser',
  env: {
    browser: true, // 开发环境配置表示可以使用浏览器的方法
    node: true, //
    es6: true,
  },
  rules: {},
}
