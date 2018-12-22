const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/Concatenate/'
    : '/',
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin(),
    ],
  },
};
