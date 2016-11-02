/**
 * Created by WesternRanger on 16/9/18.
 */
var path = require("path");

module.exports = {
    // 入口文件
    entry: {
        vuedemo:'./public/vue/vuedemo.js',
        vuexdemo:'./public/vue/vuexdemo.js',
        spa:'./public/vue/spa.js',
        spa_history:'./public/vue/spa_history.js',
        vuerouter:'./public/vue/vuerouter.js'
    },
    output: {
        path: __dirname, // 输出文件的保存路径
        filename: 'public/javascripts/[name].js' // 输出文件的名称
    },
    module: {
        loaders: [
            {test: /\.vue$/,loader: 'vue'},
            {test: /vux.src.*?js$/, loader: 'babel'},
            {test: /\.js$/,loaders: ['babel?presets[]=es2015']}
        ]
    },
    resolve: {
        root: [
            //path.join(__dirname, "./node_modules"),
            //path.join(__dirname, "./js/page"),
            //path.join(__dirname, "./js/components"),
            //path.join(__dirname, "./js/v-components"),
        ],
        alias: {
            'vux-components': 'vux/src/components/'
        }
    }
};
