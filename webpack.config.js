var webpack = require('webpack'),
    path = require('path'),
    HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + "/src",
    publicPath: 'build/',
    entry: {
        app: path.resolve(__dirname, 'src/js/app.js'),
        styles: [
            path.resolve(__dirname, 'src/scss/styles.scss')
            /*, path.resolve(__dirname, 'node_modules/toastr/build/toastr.css') */
        ]
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/build"
    },
    module: {
        loaders: [

            // javascript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel-loader"]
            },


            // sass files
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },

            // css files
            //{
            //    test: /node_modules\/toastr\/build\/toastr.css$/,
            //    loaders: ['style-loader', 'css-loader']
            //},


            // fonts
            {
                test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            inject: 'body',
            hash: true
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};
