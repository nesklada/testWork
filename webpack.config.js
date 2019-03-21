'use strict';
const merge = require('webpack-merge');
const configCommon = require('./src/webpack-config/webpack.config.common');
const configDev = require('./src/webpack-config/webpack.config.dev');
const configProd = require('./src/webpack-config/webpack.config.prod');
let config;


switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        config = configProd;
        break;
    case 'dev':
    case 'development':
    default:
        config = configDev;
        break;
}

module.exports = merge(configCommon, config);
