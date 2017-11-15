const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');
const OUT_PATH = path.resolve('./publish-demo');

module.exports = [
  {
    entry: {
      polyfills: path.resolve('src', 'demo-app', 'polyfills.ts'),
      vendor: path.resolve('src', 'demo-app', 'vendor.ts'),
      app: path.resolve('src', 'demo-app', 'main.ts'),
      css: path.resolve('src', 'demo-app', 'sass', 'main.scss')
    },
    devServer: {
      contentBase: path.resolve('src', 'demo-app'),
      port: 4000
    },
    output: {
      path: OUT_PATH,
      filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['.js', '.ts']
    },
    plugins: [
      // Workaround for angular/angular#1158
      new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, path.resolve(__dirname, './src')),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills'],
        minChunks: Infinity
      }),
      new HtmlWebpackPlugin({
        template: path.resolve('src', 'demo-app', 'index.html')
      })
    ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: path.resolve('src', 'demo-app', 'tsconfig.json')
              }
            },
            {
              loader: 'angular2-template-loader'
            }
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(css|scss)$/,
          use: ['to-string-loader', 'style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  }
];
