const extracss = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    mode:'development',
    entry: {
        app:['./app.js']
    },
    output: {
        filename: "./[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },
    //插件
    plugins: [
        // new extracss({
        //     filename: '[name].min.css'
        // }),
        // new minicss({
        //     filename: "[name].min.css"
        // }),
        new htmlWebpackPlugin({
            template: "index.html",
            filename: "index.html",
            chunks: ['app']
        }),
        // new htmlWebpackPlugin({
        //     template: "index.html",
        //     filename: "index2.html",
        //     chunks: ['app2']
        // })
    ]
}

