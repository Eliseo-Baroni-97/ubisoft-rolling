const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js',
        e404: './src/js/404.js',
        about: './src/js/about.js',
        admin: './src/js/admin.js',
        contact: './src/js/contact.js',
        games: './src/js/games.js',
        login: './src/js/login.js',
        register: './src/js/register.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]',
                    },
                }, ],

            },

            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            inject: true,
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: './src/admin.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            inject: true,
            chunks: ['admin'],
            filename: './admin.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/404.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            inject: true,
            chunks: ['e404'],
            filename: './404.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            inject: true,
            chunks: ['about'],
            filename: './about.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/contact.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            inject: true,
            chunks: ['contact'],
            filename: './contact.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/games.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            inject: true,
            chunks: ['games'],
            filename: './games.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/login.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            inject: true,
            chunks: ['login'],
            filename: './login.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/register.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            inject: true,
            chunks: ['register'],
            filename: './register.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),

        new CopyWebpackPlugin({
            patterns: [{
                    from: './src/img',
                    to: 'img',
                },

            ]
        })


    ],

};