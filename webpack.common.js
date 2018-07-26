const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve('./dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['node_modules'],
                use: [{ loader: 'babel-loader' },{ loader: 'eslint-loader'}],
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                },{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }],
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('post-flexbugs-fixes'),
                                autoprefixer({
                                    browser: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie> 9',
                                    ],
                                    flexbox: 'not-2009',
                                }),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};