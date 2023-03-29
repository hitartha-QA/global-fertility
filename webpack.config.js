// Webpack uses this to work with directories
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

  // https://webpack.js.org/concepts/#entry
  entry: './src/js/main.js',

  // https://webpack.js.org/concepts/output/
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'dist'),
    filename: './dist.bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]'
  },

  // https://webpack.js.org/concepts/modules/
  module: {
    rules: [
      {
        // Apply rule for .js
        test: /\.js$/,
        exclude: /(node_modules)/,
        // Set loaders to transform files.
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Apply rule for .css files
        test: /\.css$/,
        // Set loaders to transform files.
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            },
          }
        ]
      },
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new MiniCssExtractPlugin({
      filename: "dist.bundle.css"
    })
  ]
};
