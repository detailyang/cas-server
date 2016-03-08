/*
* @Author: detailyang
* @Date:   2016-03-08 12:02:12
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-08 13:30:18
*/

'use strict';
import config from "../config";


module.exports = async (ctx, next) => {
    const page = ctx.query.page || 1;
    const per_page = ctx.query.per_page || config.paginator.per_page;
    ctx.request.page = page;
    ctx.request.per_page = per_page;
    await next();
}