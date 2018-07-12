const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

// module.exports = {
const config = {
    // inform webpack that we are building a bundle for Nodejs 
    // rather than for the browser
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    externals: [webpackNodeExternals()]

};

module.exports = merge (baseConfig, config);