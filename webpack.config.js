const path = require('path');
const webpack = require('webpack');

const commonConfig = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'app'),
  entry: {
    'fake-server': path.resolve(__dirname, 'src/index.js'),
    'fake-server.min': path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [[
            'env', { modules: false },
          ]],
        },
      }],
    }],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
    ],
  },
};

const developmentConfig = () => {
  const config = {

    devServer: {
      port: process.env.PORT,
      host: process.env.HOST,
      contentBase: path.resolve(__dirname, 'webroot'),
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    },
  };

  return Object.assign({}, commonConfig, config);
};

const productionConfig = () => commonConfig;


module.exports = env => productionConfig();
