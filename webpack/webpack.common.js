const path = require('path')

module.exports = {
    entry: {
        'image-hasher': './react/src/index.js',
        'hash-calculator-worker': './react/src/workers/hashCalculatorWorker.js',
        'image-fetch-worker': './react/src/workers/imageFetchWorker.js',
    },
    output: {
        path: path.resolve(__dirname, '../static/js/build'),
        publicPath: '/static/js/build/',
        chunkFilename: '[name].js',
    },
    watchOptions: {
        ignored: /[\\/]node_modules[\\/]/,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@image-hasher': path.resolve(__dirname, '../react/src'),
        },
        fallback: {
            path: require.resolve('path-browserify'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
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
