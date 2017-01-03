/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-16T22:03:58+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-30T20:36:16+08:00
* @License: The MIT License (MIT)
*/


if (process.env.NODE_ENV === 'dev') {
  module.exports = {
    username: process.env.CAS_MYSQL_USERNAME || 'root',
    password: process.env.CAS_MYSQL_PASSWORD || '',
    database: process.env.CAS_MYSQL_DATABASE || 'cas',
    host: process.env.CAS_MYSQL_HOST || '127.0.0.1',
    port: process.env.CAS_MYSQL_PORT || '3306',
    logging: console.log,
  };
} else if (process.env.NODE_ENV === 'test') {
  module.exports = {
    username: 'root',
    password: '',
    database: 'cas',
    host: '127.0.0.1',
    port: '3306',
    logging: false,
  };
} else {
  module.exports = {
    username: process.env.CAS_MYSQL_USERNAME,
    password: process.env.CAS_MYSQL_PASSWORD,
    database: process.env.CAS_MYSQL_DATABASE,
    host: process.env.CAS_MYSQL_HOST,
    port: process.env.CAS_MYSQL_PORT,
    logging: false,
  };
}
