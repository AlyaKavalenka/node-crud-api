/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path'),
  pathToSrc = path.join(__dirname, 'src'),
  EslintPlugin = require('eslint-webpack-plugin');

let mode = 'development';

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  entry: path.resolve(pathToSrc, './index'),
  mode: mode,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new EslintPlugin({ extensions: 'ts' })],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
};
