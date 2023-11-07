const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // <-- ADD THIS LINE

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../client/public/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
