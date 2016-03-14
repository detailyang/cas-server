/*
 * @Author: detailyang
 * @Date:   2015-02-19 14:09:05
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T15:31:54+08:00
 */
const config = module.exports;

config.paginator = {
  per_page: 30,
};

if (process.env.NODE_ENV === 'dev') {
  config.database = {
    username: 'root',
    password: '123456',
    database: 'cas',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    logging: false,
  };
  config.redis = {
    host: '127.0.0.1',
    port: '6379',
    ttl: 3600,
    db: 0,
    key: 'momtellmewhy',
  };
  config.password = {
    'default': process.env.CAS_PASSWORD_DEFAULT || 'password',
    'bcryptlength': 12,
  };
  config.avatar = {
    width: 100,
    cache: 3 * 24 * 60 * 60,
    maxsize: 512 * 1024 * 1024,
  };
  config.notp = {
    label: process.env.CAS_NOTP_LABEL || 'cas',
    delta: process.env.CAS_NOTP_DELTA || '-3',
    salt: process.env.CAS_NOTP_SALT || '$2a$10$jsZ0onecMnHOeKUfRG9AYe',
  };
  config.syslog = {
    tag: 'cas',
    facility: 'local6',
    hostname: '192.168.66.204',
    port: 514,
  };
  config.queue = {
    name: 'cas',
    hostname: '127.0.0.1',
    port: 6379,
    db: '1',
  };
  config.cache = {
    host: '127.0.0.1',
    port: '6379',
    ttl: 3600,
    db: '2',
  };
  config.oauth = {
    ttl: 1 * 60,
  };
} else if (process.env.NODE_ENV === 'test') {
  console.log('test');
} else {
  config.database = {
    username: process.env.CAS_DATABASE_USERNAME,
    password: process.env.CAS_DATABASE_PASSWORD,
    database: process.env.CAS_DATABASE_DATABASE,
    host: process.env.CAS_DATABASE_HOST,
    port: process.env.CAS_DATABASE_PORT,
    dialect: 'mysql',
    logging: false,
  };
  config.redis = {
    host: process.env.CAS_REDIS_HOST,
    port: process.env.CAS_REDIS_PORT,
    ttl: process.env.CAS_REDIS_TTL || 3600,
    db: process.env.CAS_REDIS_DB || 0,
    key: process.env.CAS_REDIS_KEY || 'momtellmewhy',
  };
  config.password = {
    'default': process.env.CAS_PASSWORD_DEFAULT || 'password',
    'bcryptlength': process.env.CAS_PASSWORD_BCRYPTLENGTH || 12,
  };
  config.avatar = {
    width: 100,
    cache: 3 * 24 * 60 * 60,
    maxsize: 512 * 1024 * 1024,
  };
  config.notp = {
    label: process.env.CAS_NOTP_LABEL || 'cas',
    delta: process.env.CAS_NOTP_DELTA || '-3',
    salt: process.env.CAS_NOTP_SALT || '$2a$10$jsZ0onecMnHOeKUfRG9AYe',
  };
  config.syslog = {
    tag: process.env.CAS_SYSLOG_TAG || 'cas',
    facility: process.env.CAS_SYSLOG_FACILITY || 'local6',
    hostname: process.env.CAS_SYSLOG_HOSTNAME || '192.168.66.204',
    port: process.env.CAS_SYSLOG_PORT || 514,
  };
  config.queue = {
    name: process.env.CAS_QUEUE_NAME || 'cas',
    hostname: process.env.CAS_QUEUE_HOSTNAME || '127.0.0.1',
    port: process.env.CAS_QUEUE_PORT,
    db: process.env.CAS_QUEUE_DB || 1,
  };
  config.cache = {
    host: process.env.CAS_CACHE_HOST,
    port: process.env.CAS_CACHE_PORT,
    ttl: process.env.CAS_CACHE_TTL || 3600,
    db: process.env.CAS_CACHE_DB || 2,
  };
  config.oauth = {
    ttl: 1 * 60,
  };
}
