const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PagesPlugin = require('./pagesPlugin');

const config = {
  mode: 'production',
  entry: {
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
          MiniCssExtractPlugin.loader,
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
      }, {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // chunkFilename: '[id].css',
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../src/pages/index.ejs')
    // }),
    new PagesPlugin({
      path: path.resolve(__dirname, '../src/pages')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

module.exports = config;
