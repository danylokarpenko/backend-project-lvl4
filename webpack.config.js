const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public', 'assets'),
    filename: 'main.js',
    publicPath: '/public/assets/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', "postcss-loader"],
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
      }
    ]
  }
};
