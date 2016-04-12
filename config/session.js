/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-16T22:03:58+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-12T17:47:24+08:00
* @License: The MIT License (MIT)
*/


if (process.env.NODE_ENV === 'dev') {
  module.exports = {
    host: '127.0.0.1',
    port: '6379',
    ttl: 3600,
    db: 0,
    cookiekey: 'cas',
    key: 'momtellmewhy',
    secure: false,
    http_only: false,
    domain: undefined,
  };
} else if (process.env.NODE_ENV === 'test') {
  module.exports = {
    host: '127.0.0.1',
    port: '6379',
    ttl: 3600,
    db: 0,
    cookiekey: 'cas',
    key: 'momtellmewhy',
    secure: false,
    http_only: false,
    domain: undefined,
  };
} else {
  module.exports = {
    host: process.env.CAS_SESSION_HOST,
    port: process.env.CAS_SESSION_PORT,
    ttl: process.env.CAS_SESSION_TTL || 3600,
    db: process.env.CAS_SESSION_DB || 0,
    cookiekey: process.env.CAS_SESSION_COOKIEKEY || 'cas',
    key: process.env.CAS_SESSION_KEY || 'iamyoufather',
    secure: process.env.CAS_SESSION_SECURE || true,
    http_only: process.env.CAS_SESSION_HTTPONLY || true,
    domain: process.env.CAS_SESSION_DOMAIN,
  };
}
