/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-16T22:03:58+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-16T23:25:39+08:00
* @License: The MIT License (MIT)
*/


if (process.env.NODE_ENV === 'dev') {
  module.exports = {
    tag: 'cas',
    facility: 'local6',
    hostname: '127.0.0.1',
    port: 514,
  };
} else if (process.env.NODE_ENV === 'test') {
  module.exports = {
    tag: 'cas',
    facility: 'local6',
    hostname: '127.0.0.1',
    port: 514,
  };
} else {
  module.exports = {
    tag: process.env.CAS_SYSLOG_TAG,
    facility: process.env.CAS_SYSLOG_FACILITY,
    hostname: process.env.CAS_SYSLOG_HOSTNAME,
    port: process.env.CAS_SYSLOG_PORT,
  };
}
