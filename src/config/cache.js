/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-16T22:03:58+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-16T23:27:14+08:00
* @License: The MIT License (MIT)
*/


if (process.env.NODE_ENV === 'dev') {
  module.exports = {
    host: '127.0.0.1',
    port: '6379',
    ttl: 3600,
    db: '2',
  };
} else if (process.env.NODE_ENV === 'test') {
  module.exports = {
    host: '127.0.0.1',
    port: '6379',
    ttl: 3600,
    db: '2',
  };
} else {
  module.exports = {
    host: process.env.CAS_CACHE_HOST,
    port: process.env.CAS_CACHE_PORT,
    ttl: process.env.CAS_CACHE_TTL,
    db: process.env.CAS_CACHE_DB,
  };
}
