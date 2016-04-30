/*
 * @Author: detailyang
 * @Date:   2016-03-08 11:49:43
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T16:41:05+08:00
 */
import convert from 'koa-convert';
import path from 'path';
import staticCache from 'koa-static-cache';

module.exports = convert(staticCache(path.join(__dirname, '../static'), {
  maxAge: 3 * 24 * 60 * 60,
}));
