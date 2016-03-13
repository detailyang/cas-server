/*
* @Author: detailyang
* @Date:   2016-02-18 20:38:38
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T19:16:09+08:00
*/


import config from '../config';

const SysLogger = require('ain2');
const logger = new SysLogger({
  tag: config.syslog.tag,
  facility: config.syslog.facility,
  hostname: config.syslog.hostname,
  port: config.syslog.port,
},
);

module.exports = logger;
