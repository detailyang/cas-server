/*
 * @Author: detailyang
 * @Date:   2016-03-08 13:30:45
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T16:41:55+08:00
 */
import convert from 'koa-convert';
import proxy from 'koa-proxy';

module.exports = convert(proxy({
  host: 'http://0.0.0.0:8080/build',
  match: /.*\.js/,
}));
