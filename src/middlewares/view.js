/*
* @Author: detailyang
* @Date:   2016-03-08 12:45:17
* @Last modified by:   detailyang
* @Last modified time: 2016-04-05T00:33:01+08:00
*/

import convert from 'koa-convert';
import views from 'koa-views';


module.exports = convert(views(`${__dirname}/../views`, {
  map: {
    html: 'nunjucks',
  },
}));
