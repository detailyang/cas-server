/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-16T22:03:58+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-16T23:59:10+08:00
* @License: The MIT License (MIT)
*/

if (process.env.NODE_ENV === 'dev') {
  module.exports = {
    name: 'cas',
    hostname: '127.0.0.1',
    port: 6379,
    db: '1',
  };
} else if (process.env.NODE_ENV === 'test') {
  module.exports = {
    name: 'cas',
    hostname: '127.0.0.1',
    port: 6379,
    db: '1',
  };
} else {
  module.exports = {
    name: process.env.CAS_QUEUE_NAME,
    hostname: process.env.CAS_QUEUE_HOSTNAME,
    port: process.env.CAS_QUEUE_PORT,
    db: process.env.CAS_QUEUE_DB,
  };
}
