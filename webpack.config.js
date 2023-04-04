// Webpack uses this to work with directories
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");

module.exports = {

  // https://webpack.js.org/concepts/#entry
  entry: {
    main: ['./src/css/main.css', './src/js/main.js']
  },

  // https://webpack.js.org/concepts/output/
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'dist'),
    filename: './[name].min.js',
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
            /* options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            }, */
          }
        ]
      },
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new RemovePlugin({
      // Removes files and folders before and after compilation
      before: {
        // Before compilation permanently removes entire './assets' folder.
        include: ["./dist"],
      },
      watch: {
        // parameters for "before watch compilation" stage.
      },
      after: {
        // parameters for "after normal and watch compilation" stage.
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].min.css"
    })
  ]
};
