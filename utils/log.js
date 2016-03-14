/*
* @Author: detailyang
* @Date:   2016-02-18 20:38:38
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T17:47:37+08:00
*/


import config from '../config';
import winston from 'winston';
require('winston-syslog').Syslog;


winston.add(winston.transports.Syslog, {
  host: config.syslog.hostname,
  port: config.syslog.port,
  facility: config.syslog.facility,
  app_name: config.syslog.tag,
});
winston.remove(winston.transports.Console);

module.exports = winston;
