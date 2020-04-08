const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    page: path.resolve(__dirname, '../src/pages'),
    content: path.resolve(__dirname, '../src/content'),
    background: path.resolve(__dirname, '../src/background'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }, {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader'
          },
        }]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9000,
    writeToDisk: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/pages/index.ejs')
    })
  ]
};

module.exports = config;
