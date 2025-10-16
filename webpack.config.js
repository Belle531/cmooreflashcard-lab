const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const sass = require('sass'); // Explicitly using Dart Sass engine

// ✅ Define environment mode
const isProd = process.env.NODE_ENV !== 'development';
console.log("prod", isProd);
console.log(process.env.NODE_ENV);

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: {
                fiber: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new Dotenv()
  ].filter(Boolean), // ✅ Correct placement inside plugins array
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 5000,
    open: true,
    hot: true,
    liveReload: true,
    client: {
      overlay: true,
      reconnect: true
    }
  },
  stats: {
    warningsFilter: [/sass-loader/]
  }
};