/*
* @Author: detailyang
* @Date:   2016-03-08 12:45:17
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-08 12:55:53
*/

'use strict';
import convert from "koa-convert";
import views from "koa-views";

module.exports = convert(views(`${__dirname}/../views`));
