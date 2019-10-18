const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");

const devCerts = require("office-addin-dev-certs");

let argv = process.argv;
let https = null;
let index = argv.findIndex(it => it === "--https");
if (index !== -1) {
    https = argv[index + 1] === 'true';
}

module.exports = merge(common, {
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css?$/,
                use: [
                    "vue-style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    "vue-style-loader",
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            indentedSyntax: true,
                            // sass-loader version >= 8
                            sassOptions: {
                                indentedSyntax: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader",
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // 你也可以从一个文件读取，例如 `variables.scss`
                            // 如果 sass-loader 版本 < 8，这里使用 `data` 字段
                            prependData: `$color: red;`
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "vue-style-loader",
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        https: https !== null ? https : devCerts.getHttpsServerOptions(),
        port: process.env.npm_package_config_dev_server_port || 3000
    }
});
