const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    entry: ['@babel/polyfill', './src/app.js'],
    output: {
      path: path.resolve(__dirname, 'assets'),
      filename: "bundle.js",
      publicPath: "static/assets/"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader!postcss-loader!sass-loader'
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!postcss-loader!sass-loader'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
      ]
    },
    watch: true
  }
}
