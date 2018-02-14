const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || '8080';

const config = {
  context: __dirname,
  devtool: '#source-map',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './renderer.js'),
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
  ],
  target: 'electron-renderer',
  output: {
    filename: 'renderer.bundle.js',
    path: path.join(__dirname, 'bundle'),
    publicPath: `http://localhost:${port}/bundle/`,
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders:
      [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'renderer.js')
        ],
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'react-hmre'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = config;
