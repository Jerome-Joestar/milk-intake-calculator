module.exports = {
    entry: [
        './app/index.js'
    ],
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        host: 'localhost',
        inline: false,
        port: 3030,
        contentBase: './'
    }
}