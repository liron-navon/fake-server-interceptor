const path = require('path');

const commonConfig = {
  context: path.resolve(__dirname, 'app'),
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [[
            'env', { modules: false }
          ]]
        }
      }]
    }]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src')
    ]
  }
};

const developmentConfig = () => {

  const config = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      port: process.env.PORT,
      host: process.env.HOST,
      contentBase: path.resolve(__dirname, 'webroot'),
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }
  };

  return Object.assign({}, commonConfig, config);

};

const productionConfig = () => commonConfig;


module.exports = (env) => {

  if (env === 'production') {

    return productionConfig();

  }

  return developmentConfig();

};
