// adapted from https://github.com/marharyta/webpack-react-setup/tree/ed06e265e8d4b23b1dca350a997ce903f777e8bd

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    entry: {
        main: './www/index.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourcemap: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /www/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: 'file-loader',
            },
            {
                test: /\.isp$/,
                use: 'raw-loader',
            },
            {
                test: /\.md$/,
                use: 'babel~react-markdown',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new MonacoWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
        }),
    ],
};
