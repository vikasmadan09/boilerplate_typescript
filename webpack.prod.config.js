const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const optimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');
const packageJson = require('./package.json');
const packageName = packageJson.name.replace(/@/, '-').replace(/\//, '-');
const version = packageJson.version.toLowerCase().trim();

const config = {
  mode: 'production',
  entry: './src/index.tsx',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: 'auto',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${packageName}_${version}_[name].[fullhash].css`,
      chunkFilename: `${packageName}_${version}_[name].[fullhash].bundle.css`,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new terserPlugin({
        extractComments: true,
        parallel: true,
        terserOptions: {
          safari10: true,
        },
      }),
      new optimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'async',
    },
  },
};

module.exports = config;
