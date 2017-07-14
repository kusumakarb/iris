const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const outDir = path.resolve(__dirname, 'dist');

module.exports = {
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true
  },
  entry: './server/server.js',
  output: {
    path: outDir,
    filename: 'bundle.js'
  },
  externals: nodeModules,
  module: {
    loaders: [
      {test: /\.json$/, loader: "json-loader"}
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      compress: {
        warnings: false
      },
      mangle: true
    })
  ]
}
