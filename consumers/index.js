/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T21:08:41+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-17T00:29:26+08:00
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
  co(function *() {
    const ocs = yield models.oauth.findAll({
      attributes: ['id', 'name', 'secret', 'domain', 'desc', 'callback'],
      where: {
        is_delete: false,
      },
    });

    switch (msg.data.type) {
      case 'user.update': {
        ocs.map((oc) => {
          if (!oc.callback && !oc.is_admin) {
            return true;
          }
          request
            .post(oc.callback)
            .send(msg.data)
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
