const webpack = require('webpack');
const path = require('path');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const {
    VERSION,
    PLATFORM,
    NODE_ENV,
  } = env;

  return merge([{
    entry: [(path.join(process.cwd(), 'app/app.js'))],
    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      path: (path.join(process.cwd(), 'build')),
      publicPath: '/',
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: ['/node_modules/'],
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(css|scss)$/,
          exclude: ['/node_modules/'],
          use: [
            (PLATFORM === 'production') ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true, // default is false
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[name]--[local]--[hash:base64:8]',
              },
            },
            'sass-loader',
            'postcss-loader',
          ]
        },
        {
          test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
          use: 'file-loader',
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                progressive: true,
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
              },
            },
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'app/index.html',
        filename: 'index.html',
        inject: true,
      }),
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(VERSION),
        'process.env.PLATFORM': JSON.stringify(PLATFORM),
        'process.env.PLATFORM': JSON.stringify(NODE_ENV),
      }),
    ],
    resolve: {
      modules: [
        'app',
        'node_modules'
      ],
      extensions: [
        '.js',
        '.jsx',
        '.react.js',
      ],
      mainFields: [
        'browser',
        'jsnext:main',
        'main',
      ],
    },
    devtool: 'cheap-module-source-map',
    target: 'web'
  }])
}