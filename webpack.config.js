const devCerts = require("office-addin-dev-certs");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = async (env, options) => {
    const dev = options.mode === "development";
    const config = {
        devtool: "source-map",
        entry: {
            polyfill: "@babel/polyfill",
            main: path.join(__dirname, './src/main.js'),
            commands: path.join(__dirname, './template/commands/commands.js'),
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, './dist')
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
                        path.resolve(__dirname, './src')
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
        plugins: [
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(),
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
        devServer: {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            https: (options.https !== undefined) ? options.https : await devCerts.getHttpsServerOptions(),
            port: process.env.npm_package_config_dev_server_port || 3000
        }
    };

    return config;
};
