/*
 * @Author: detailyang
 * @Date:   2016-02-18 16:08:50
* @Last modified by:   detailyang
* @Last modified time: 2016-03-16T23:16:42+08:00
 */


module.exports = {
  'mysql': require('./mysql'),
  'session': require('./session'),
  'syslog': require('./syslog'),
  'queue': require('./queue'),
  'cache': require('./cache'),
  'cas': {
    port: process.env.CAS_CAS_PORT || 3000,
  },
  'password': {
    'default': process.env.CAS_PASSWORD_DEFAULT || 'password',
    'bcryptlength': process.env.CAS_PASSWORD_BCRYPTLENGTH || 12,
  },
  'avatar': {
    width: 100,
    cache: 3 * 24 * 60 * 60,
    maxsize: 512 * 1024 * 1024,
  },
  'notp': {
    label: process.env.CAS_NOTP_LABEL || 'cas',
    delta: process.env.CAS_NOTP_DELTA || '-3',
    salt: process.env.CAS_NOTP_SALT || '$2a$10$jsZ0onecMnHOeKUfRG9AYe',
  },
  'oauth': {
    ttl: 1 * 60,
  },
  'paginator': 30,
};
