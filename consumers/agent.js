/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T21:08:41+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-25T23:32:36+07:00
* @License: The MIT License (MIT)
*/


require('babel-core/register')({
  presets: ['es2015-node5', 'stage-3'],
});
require('babel-polyfill');


const Queue = require('bull');
const request = require('superagent');
const co = require('co');
const utils = require('../utils');

const config = require('../config');
const models = require('../models');
const email = require('../utils/email');


const agentQueue = Queue(
  `${config.queue.name}:agent`,
  {
    redis: {
      port: config.queue.port,
      host: config.queue.hostname,
      DB: config.queue.db,
    },
  }
);

agentQueue.process((msg, done) => {
  console.log(msg);
  done();
});
