/*
* @Author: detailyang
* @Date:   2016-03-08 12:02:12
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-08 15:56:11
*/

'use strict';
import config from "../config";


module.exports = async (ctx, next) => {
    let page = ctx.query.page || 1;
    let per_page = ctx.query.per_page || config.paginator.per_page;
    ctx.request.page = +page;
    ctx.request.per_page = +per_page;
    await next();
}