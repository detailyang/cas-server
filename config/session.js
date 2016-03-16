/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-16T22:03:58+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-16T23:25:51+08:00
* @License: The MIT License (MIT)
*/


if (process.env.NODE_ENV === 'dev') {
  module.exports = {
    host: '127.0.0.1',
    port: '6379',
    ttl: 3600,
    db: 0,
    key: 'momtellmewhy',
  };
} else if (process.env.NODE_ENV === 'test') {
  module.exports = {
    host: '127.0.0.1',
    port: '6379',
    ttl: 3600,
    db: 0,
    key: 'momtellmewhy',
  };
} else {
  module.exports = {
    host: process.env.CAS_REDIS_HOST,
    port: process.env.CAS_REDIS_PORT,
    ttl: process.env.CAS_REDIS_TTL || 3600,
    db: process.env.CAS_REDIS_DB || 0,
    key: process.env.CAS_REDIS_KEY || 'iamyoufather',
  };
}
