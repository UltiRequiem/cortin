const { join } = require('node:path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js'],
    // Fix for ES module resolution issues when root package.json has "type": "module"
    // This tells webpack to allow imports without file extensions
    fullySpecified: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // Additional rule to handle node_modules with ES module issues
      {
        test: /\.js$/,
        include: /node_modules/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCSSExtractPlugin({ filename: 'assets/[name].css' })
  ],
  optimization: {
    minimize: true,
    minimizer: [new CSSMinimizerPlugin(), new TerserPlugin()]
  }
}
