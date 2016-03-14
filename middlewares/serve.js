/*
 * @Author: detailyang
 * @Date:   2016-03-08 11:49:43
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T15:46:02+08:00
 */
import serve from 'koa-static';
import convert from 'koa-convert';

module.exports = convert(serve('.'));
