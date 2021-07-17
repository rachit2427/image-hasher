const path = require('path')

module.exports = {
    entry: {
        'image-hasher': path.resolve(__dirname, '../react/src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../static/js/build'),
        chunkFilename: '[name].js',
        publicPath: '',
    },
    watchOptions: {
        ignored: /[\\/]node_modules[\\/]/,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@image-hasher': path.resolve(__dirname, '../react/src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
}
