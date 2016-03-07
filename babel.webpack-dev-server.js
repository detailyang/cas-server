/*
* @Author: detailyang
* @Date:   2016-03-02 16:50:00
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-02 16:50:00
*/

'use strict';
require("babel-core/register")({
    presets: ['es2015-node5', 'stage-3']
});
require("babel-polyfill");
require('./webpack-dev-server.js');
