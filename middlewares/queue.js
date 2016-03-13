/*
 * @Author: detailyang
 * @Date:   2016-03-08 12:02:12
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T21:32:37+08:00
 */


import Queue from 'bull';
import config from '../config';

const queue = Queue(
  config.queue.name,
  {
    redis: {
      port: config.queue.port,
      host: config.queue.hostname,
      DB: config.queue.db,
    },
  }
);

module.exports = async(ctx, next) => {
  ctx.queue = queue;
  await next();
};
