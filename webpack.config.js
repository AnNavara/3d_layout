const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: mode,
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'index.html'
    })],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpe?g|gif|webp)$/i,
                dependency: { not: ['url'] },
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['eslint-loader']
            }
        ],
    },
    devServer: {
        static: './dist',
        port: 3000,
        hot: isDev,
    },
    devtool: isDev ? 'source-map' : false,
};
