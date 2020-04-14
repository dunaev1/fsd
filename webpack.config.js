const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader']
};
const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      pug,
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader']
          })
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin(
      {
        filename: 'main.css',
      }
    ),
    new HtmlWebpackPlugin({
      filename: 'test_page.html',
      template: 'src/test.pug',
      inject: false
    }),
    //new HtmlWebpackPlugin({
    //  filename: 'index1.html',
    //  template: 'src/index.pug',
    //  inject: false
    //}),

 ]
};
module.exports = config;
