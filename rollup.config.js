import path from 'path';
import json from '@rollup/plugin-json';
import rollupTypescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const globalName = 'rft';

const paths = {
  input: path.join(__dirname, '/src/index.ts'),
  output: path.join(__dirname, '/dist'),
};

// const rollupConfig: RollupOptions = {
// rollup 配置项
const rollupConfig = {
  input: paths.input,
  output: [
    // 输出 umd 规范的代码
    {
      file: path.join(paths.output, 'index.min.js'),
      format: 'umd',
      name: globalName,
      sourcemap: process.env.TARGET === 'development' ? true : false
    },
    // 输出 commonjs 规范的代码
    {
      file: path.join(paths.output, 'index.js'),
      format: 'cjs',
      name: globalName,
      exports: 'auto',
    },
    // 输出 es 规范的代码
    {
      file: path.join(paths.output, 'index.esm.js'),
      format: 'es',
      name: globalName,
    },
  ],
  external: [], // 指出应将哪些模块视为外部模块，如 Peer dependencies 中的依赖
  // plugins 需要注意引用顺序
  plugins: [
    nodePolyfills({
      include: 'node_modules/node-rsa/**/*.js',
      sourcemap: process.env.TARGET === 'development' ? true : false
    }),
    // 配合 commnjs 解析第三方模块
    resolve({
      browser: true
    }),
    json(),
    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    commonjs(),
    // 验证导入的文件
    eslint({
      throwOnError: true, // lint 结果有错误将会抛出异常
      throwOnWarning: true,
      include: ['src/**/*.ts'],
      exclude: ['node_modules/**', 'dist/**', '*.js'],
    }),
    rollupTypescript(),
    babel({
      babelHelpers: 'external',
      // 只转换源代码，不运行外部依赖
      exclude: 'node_modules/**',
      // babel 默认不支持 ts 需要手动添加
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
      ],
    }),
    process.env.TARGET === 'development' ? '' : terser({compress: {
      drop_debugger: true,
      drop_console: true
    }}),
    process.env.TARGET === 'development' ? serve({
      open: true,
      contentBase: './',
      host: 'localhost',
      port: '8091'
    }) : '',
    process.env.TARGET === 'development' ? livereload({
      watch: ['./index.html', 'dist']
    }) : ''
  ],
};

export default rollupConfig;
