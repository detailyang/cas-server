/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:29:31+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-20T19:47:18+08:00
* @License: The MIT License (MIT)
*/


const fs = require('fs');

const babelrc = fs.readFileSync('./.babelrc');
let config = {};


try {
   config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-core/register')(config);
require('babel-polyfill');
require('./index.js');
