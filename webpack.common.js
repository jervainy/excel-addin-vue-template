const devCerts = require("office-addin-dev-certs");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        polyfill: "@babel/polyfill",
        main: path.resolve(__dirname, 'src/main.js'),
        commands: path.resolve(__dirname, './template/commands/commands.js'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".html", ".js", ".vue"],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                include: [
                    path.resolve(__dirname, 'src')
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: "html-loader"
            },
            {
                test: /\.(png|jpg|jpeg|gif)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            _: "lodash"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, './template/index.html'),
            chunks: ["polyfill", "main"]
        }),
        new HtmlWebpackPlugin({
            filename: "taskpane.html",
            template: path.join(__dirname, './template/index.html'),
            chunks: ["polyfill", "main"]
        }),
        new HtmlWebpackPlugin({
            filename: "commands.html",
            template: path.join(__dirname, './template/commands/commands.html'),
            chunks: ["polyfill", "commands"]
        })
    ],
};
