/*
 * @Author: detailyang
 * @Date:   2016-03-08 13:30:45
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-08 16:46:28
 */
import convert from 'koa-convert';
import proxy from 'koa-proxy';

module.exports = convert(proxy({
  host: 'http://0.0.0.0:8080/build',
  match: /^\/build\//,
}));
