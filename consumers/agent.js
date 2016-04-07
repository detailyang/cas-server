/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T21:08:41+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-07T18:05:02+08:00
* @License: The MIT License (MIT)
*/


require('babel-core/register')({
  presets: ['es2015-node5', 'stage-3'],
});
require('babel-polyfill');


const Queue = require('bull');
const request = require('superagent');
const co = require('co');

const config = require('../config');


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
  console.log(`agent receive event ${msg.data}`);
  co(function *() {
    switch (msg.data.type) {
      case 'user.update':
        request
          .post(msg.data.callback)
          .send(msg.data)
          .set('authorization', `oauth ${msg.data.identify}`)
          .end((err, res) => {
            if (err) {
              console.log(err);
              done(err);
            }
            if (!res) {
              done(err);
            }
          });
        break;
      default:
        break;
    }
  })
  .catch((err) => {
    console.log(err);
    done(err);
  });
});
