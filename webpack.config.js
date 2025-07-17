const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const sass = require('sass'); // Explicitly using Dart Sass engine

// ✅ Define environment mode flag
const isProd = process.env.NODE_ENV === 'production';
console.log(isProd);
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
    new Dotenv(),
    isProd &&
      new webpack.DefinePlugin({
        'process.env.REACT_APP_AWS_REGION': JSON.stringify(process.env.REACT_APP_AWS_REGION),
        'process.env.REACT_APP_AWS_ACCESS_KEY_ID': JSON.stringify(process.env.REACT_APP_AWS_ACCESS_KEY_ID),
        'process.env.REACT_APP_AWS_SECRET_ACCESS_KEY': JSON.stringify(process.env.REACT_APP_AWS_SECRET_ACCESS_KEY)
      })
  ].filter(Boolean), // Removes falsy plugins like "false" if not in prod
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,
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


