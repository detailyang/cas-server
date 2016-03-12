/*
 * @Author: detailyang
 * @Date:   2016-03-08 11:49:43
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-08 13:30:22
 */
import session from 'koa-session2';
import Store from '../utils/redis.js';
import config from '../config';

module.exports = session({
  store: new Store(config.redis.host, config.redis.port,
    config.redis.db, config.redis.key),
});
