/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T21:08:41+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T22:05:52+08:00
* @License: The MIT License (MIT)
*/


const Queue = require('bull');
const request = require('superagent');
const co = require('co');

const config = require('../config');
const models = require('../models');

const queue = Queue(
  config.queue.name,
  {
    redis: {
      port: config.queue.port,
      host: config.queue.hostname,
      DB: config.queue.db,
    },
  }
);

queue.process((msg, done) => {
  console.log(msg);
  co(function *() {
    const ocs = yield models.oauth.findAll({
      attributes: ['id', 'name', 'secret', 'domain', 'desc', 'callback'],
      where: {
        is_delete: false,
      },
    });

    console.log(ocs);
    switch (msg.data.event) {
      case 'user.online':
      case 'user.offline': {
        ocs.map((oc) => {
          console.log(oc);
          if (!oc.callback) {
            return true;
          }
          request
            .get(oc.callback)
            .set('authorization', `oauth ${oc.identify}`)
            .end((err, res) => {
              // maybe we should record the error:)
              if (err) return;
              if (!res) return;
            });
          return true;
        });
        break;
      }
      default:
        break;
    }
    done();
  })
  .catch((err) => {
    console.log(err);
    done();
  });
});
