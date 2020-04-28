const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pug = {
  test: /\.pug$/,
  use: [ 
    {
      //'html-loader?attrs=false',
      loader: 'html-loader',
      options: {
        interpolate: true,
        attributes: {
          list: [
            {
              tag: "img",
              attributes: "src",
              type: "src",
            }
          ]
        }
      }
    },
    'pug-html-loader']
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
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttff?|woff2?)$/,
        use: ['file-loader?name=fonts/[name].[ext]&esModule=false'], 
      },
      {
        test: /\.(svg|png)$/,
        use: ['file-loader?name=img/[name].[ext]&esModule=false'], 
      },

    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    /*new HtmlWebpackPlugin({
      filename: 'test_page.html',
      template: 'src/test.pug',
      inject: false
    }),*/
    new HtmlWebpackPlugin({
      filename: 'colors_types.html',
      template: 'src/pages/colors_types/colors_types.pug',
      inject: false
    }),
  ]
};
module.exports = config;
