/*
 * @Author: detailyang
 * @Date:   2016-03-08 11:49:43
* @Last modified by:   detailyang
* @Last modified time: 2016-04-01T16:32:30+08:00
 */
import session from 'koa-session2';
import Store from '../utils/redis.js';
import config from '../config';

module.exports = session({
  store: new Store(config.session.host, config.session.port,
    config.session.db, config.session.key, config.session.ttl),
});
