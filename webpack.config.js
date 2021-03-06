const path = require('path');

module.exports = {
    mode: 'development',
    entry: './movies/static/src/index.js',
    devServer: {
        contentBase: path.join(__dirname, 'movies'),
        publicPath: '/static/dist/',
        port: 3000,
        proxy: {
            '!/static/dist/**': {
                target: 'http://127.0.0.1:5000'
            }
        }
    },
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'movies/static/dist'),
        publicPath: '/static/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }
};
