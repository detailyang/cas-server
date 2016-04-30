/*
 * @Author: detailyang
 * @Date:   2016-03-08 11:59:09
* @Last modified by:   detailyang
* @Last modified time: 2016-04-05T14:34:32+08:00
 */


import log from '../utils/log';

module.exports = async(ctx, next) => {
  ctx.log = log;
  const start = new Date;
  await next();
  const ms = new Date - start;
  const body = {};
  if (ctx.session && ctx.session.id) {
    body.id = ctx.session.id;
    body.type = 'session';
    body.name = ctx.session.username;
  } else if (ctx.oauth && ctx.oauth.id) {
    body.id = ctx.oauth.id;
    body.type = 'session';
    body.name = ctx.oauth.name;
  } else {
    body.type = 'default';
  }

  body.url = ctx.request.url;
  body.status = ctx.response.status;
  body.code = (ctx.response.body && ctx.response.body.code) || 0;
  body.rt = ms;
  log.info(body);
  // output to stdout
  console.log(body);
};
