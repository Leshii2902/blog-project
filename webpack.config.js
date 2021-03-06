const path = require('path');
const Html = require('html-webpack-plugin');
const webpack = require('webpack');
const argv = require('yargs').argv;

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        app: [
            './app.jsx',
            './styles/style.sass',
        ],
    },

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },

    devtool: isDevelopment ? 'source-map' : false,

    module: {
        rules: [
            {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: "babel-loader",
             query: {
                 presets: [
                        "react",
                        "es2015",
                        "stage-1"
                  ],
                 plugins: ['transform-decorators-legacy']
                }
            },
            {
                test: /\.s[a,s]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        },
                    ],
                    fallback: 'style-loader',
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '../',
                            name: '[path][name].[ext]',
                        },
                    },
                    'img-loader',
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '../',
                            name: '[path][name].[ext]',
                        },
                    }
                ],
            },
        ]

    },

    resolve: {
        extensions: ['.js', '.css'],
    },

    plugins: [
        new CleanWebpackPlugin(['public']),

        new CopyWebpackPlugin(
            [
                { from: path.join(__dirname, 'src') + '/img', to: 'img' },
            ]
        ),

        new ExtractTextPlugin(
            'styles/[name].css'
        ),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),

        new Html({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: path.join(__dirname, 'public', 'index.html')
        }),
    ]
};

if (isProduction) {
    module.exports.plugins.push(
        // Image optimizer
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i
        })
    );

    module.exports.plugins.push(
        new UglifyJSPlugin({
            sourceMap: true
        })
    );

    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    );
}

