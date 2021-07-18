const common = require('./webpack.common')

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    ...common,
}
