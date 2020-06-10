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
  optimization: {
    minimize: false,
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
      {
        test: /(jquery.min.js)$/, // copy files
        use: ['file-loader?name=[name].[ext]&esModule=false'],
      }
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'test_page.html',
      template: 'src/test.pug',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'colors_types.html',
      template: 'src/pages/colors_types/colors_types.pug',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'form_elements.html',
      template: 'src/pages/form_elements/form_elements.pug',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'pagecards.html',
      template: 'src/pages/pagecards/pagecards.pug',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'headers_footers.html',
      template: 'src/pages/headers_footers/header_footers.pug',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'landing_page.html',
      template: 'src/pages/landing/langing.pug',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'registration.html',
      template: 'src/pages/regsign/register.pug',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'signin.html',
      template: 'src/pages/regsign/signin.pug',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'search_room.html',
      template: 'src/pages/search_room/search_room.pug',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'room_details.html',
      template: 'src/pages/room_details/room_details.pug',
      inject: false
    }),
  ]
};
module.exports = config;
