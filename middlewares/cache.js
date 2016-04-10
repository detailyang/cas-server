/*
 * @Author: detailyang
 * @Date:   2016-03-08 12:02:12
* @Last modified by:   detailyang
* @Last modified time: 2016-04-01T16:50:42+08:00
 */


import Redis from 'ioredis';

import config from '../config';

const redis = new Redis({
  port: config.cache.port,
  host: config.cache.host,
  db: config.cache.db,
});

module.exports = async(ctx, next) => {
  ctx.redis = redis;
  await next();
};
