const path = require('path');
const PagesPlugin = require('./pagesPlugin');

const config = {
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
  plugins: [
    new PagesPlugin({
      path: path.resolve(__dirname, '../src/pages')
    })
  ],
};

module.exports = config;
