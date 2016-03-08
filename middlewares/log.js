/*
* @Author: detailyang
* @Date:   2016-03-08 11:59:09
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-08 11:59:22
*/

'use strict';
module.exports = async (ctx, next) => {
    const start = new Date;
    await next();
    const ms = new Date - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}