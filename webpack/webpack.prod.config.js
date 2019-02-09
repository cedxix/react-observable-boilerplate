const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const baseWebpackconfig = require('./webpack.base.config');

const prodWebpackConfig = (env) => {
  const {
    VERSION,
    PLATFORM,
    NODE_ENV,
  } = env;

  return merge([{
    optimization: {
      // runtimeChunk: 'single',
      // splitChunks: {
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: 'vendors',
      //       chunks: 'all'
      //     }
      //   }
      // },
      minimizer: [new UglifyJsPlugin()],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new OptimizeCssAssetsPlugin(),
      new Visualizer({
        filename: './statistics.html'
      })
    ],
  }, ]);
}

module.exports = (env) => merge([
  baseWebpackconfig(env),
  prodWebpackConfig(env)
]);