const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

 const config = {
    // inform webpack that we are building a bundle for Nodejs 
    // rather than for the browser
    // target: 'node',
    entry: './src/client/client.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }
};

module.exports = merge(baseConfig, config);