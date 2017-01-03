/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-20T23:43:35+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:35:07+08:00
* @License: The MIT License (MIT)
*/


if (process.env.NODE_ENV === 'production') {
  module.exports = require('./DevTools.prod');
} else {
  module.exports = require('./DevTools.dev');
}
