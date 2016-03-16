/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-16T22:03:58+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-16T23:25:24+08:00
* @License: The MIT License (MIT)
*/


if (process.env.NODE_ENV === 'dev') {
  module.exports = {
    username: 'root',
    password: '123456',
    database: 'cas',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    logging: true,
  };
} else if (process.env.NODE_ENV === 'test') {
  module.exports = {
    username: 'root',
    password: '123456',
    database: 'cas',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    logging: false,
  };
} else {
  module.exports = {
    username: process.env.CAS_DATABASE_USERNAME,
    password: process.env.CAS_DATABASE_PASSWORD,
    database: process.env.CAS_DATABASE_DATABASE,
    host: process.env.CAS_DATABASE_HOST,
    port: process.env.CAS_DATABASE_PORT,
    dialect: 'mysql',
    logging: false,
  };
}
