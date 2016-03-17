/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T21:08:41+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-17T15:45:26+08:00
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

function* changePassword(user) {
  const where = {};
  if (user.id) {
    where.id = user.id;
  }

  if (user.username) {
    where.username = user.username;
  }
  where.is_delete = false;

  const _user = yield models.user.findOne({
    attributes: ['email'],
    where,
  });
  if (!_user) {
    return;
  }

  const otp = utils.password.otpqrcode(
    utils.password.encrypt(
      user.username + user.password, config.notp.salt),
    config.notp.label);
  const text = `you google authorization secret is ${otp}`;
  const rv = yield email.send('cas google authorization update', text, _user.email);
  console.log(rv);
}

queue.process((msg, done) => {
  co(function *() {
    const ocs = yield models.oauth.findAll({
      attributes: ['id', 'name', 'secret', 'domain', 'desc', 'callback'],
      where: {
        is_delete: false,
      },
    });

    switch (msg.data.type) {
      case 'user.update':
        if (msg.data.value.password) {
          yield changePassword(msg.data.value);
          break;
        }
        ocs.map((oc) => {
          if (msg.data.value.avatar) {
            return true;
          }
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
