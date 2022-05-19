const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chat.bundle.js',
    publicPath: "/"
  },
  resolve: {
    fallback: {
      "fs": false
    },
    alias: {
      'handlebars' : 'handlebars/dist/handlebars',
      _: path.resolve(__dirname, './static/'),
    },
    extensions: ['.ts', '.js', '.json', '.scss', '.html']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        exclude: /(node_modules)/
      },
      { test: /\.handlebars$/, loader: "handlebars-loader" },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {}
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'static/index.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'static', 'image'),
          to: './image',
        },
        {
          from: path.resolve(__dirname, 'static', 'favicons'),
          to: './favicons',
        },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: {
      index: '/'
    },
    compress: true,
    port: 3000,
    hot: true,
    client: {
      overlay: false,
    },
  }
};