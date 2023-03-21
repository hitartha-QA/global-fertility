const path = require("path");
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");

var config = {
	entry: {
		// Define the entry points of our application (can be multiple for different sections of a website)
		main: ["./src/scss/index.scss", "./src/js/index.js"],
	},
	output: {
		// Define the destination directory and filenames of compiled resources
		filename: "js/[name].min.js",
		path: path.resolve(__dirname, "./../../dist"),
	},
	module: {
		rules: [
			{
				// This rule is here to Use babel for JS files
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				// This rule is here to Exposes jQuery for use outside of Webpack build
				test: require.resolve("jquery"),
				loader: "expose-loader",
				options: {
					exposes: ["$", "jQuery"],
				},
			},
			{
				// This rule is here for compile SASS/SCSS to css
				test: /\.s[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader, // instead of style-loader
					{ loader: "css-loader", options: { sourceMap: true } },
					{ loader: "postcss-loader", options: { sourceMap: true } },
					{ loader: "sass-loader", options: { sourceMap: true } },
				],
			},
			{
				//This rule is here to include font awesome deps as separate font
				test: /\.(svg|eot|woff|woff2|ttf)$/,
				type: "asset/resource",
				generator: {
					//publicPath: '../fonts/',
					filename: "./fonts/[hash][ext][query]",
				},
			},
		],
	},
	optimization: {},
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
			// Extracts CSS into separate files
			filename: "css/[name].min.css",
			chunkFilename: "[id].css",
		}),
		/* new CopyPlugin({
			patterns: [
				{ from: "./src/images/", to: "./images" },
				{ from: "./src/js/html5shiv.js", to: "./js/" },
			],
		}), */
	],
};

module.exports = (env, argv) => {
	if (argv.mode === "development") {
		// only for development mode

		config.devtool = "source-map"; // Define development options
	}

	if (argv.mode === "production") {
		// only for production mode

		config.optimization = {
			minimize: true,
			minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
		};
	}

	return config;
};
