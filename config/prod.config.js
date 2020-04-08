const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BaseConfig = require('./base.config');

const config = merge(BaseConfig, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // chunkFilename: '[id].css',
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
});

module.exports = config;
