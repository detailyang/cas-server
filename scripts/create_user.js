require('babel-core/register')({
  presets: ['es2015-node5', 'stage-3'],
});
require('babel-polyfill');

const minimist = require('minimist');
const uuid = require('uuid');
const utils = require('../utils');
const config = require('../config');
const models = require('../models');
const co = require('co');


const argv = minimist(process.argv.slice(2));
const username = argv.username;
const realname = argv.realname || '管理员';
const aliasname = argv.aliasname || 'admin';
const email = argv.email || 'admin@admin.com';
const mobile = argv.mobile || '01234567890';
const gender = argv.gender || false;
const admin = argv.admin || false;

const createUser = function*(data) {
  const salt = utils.password.genSalt(config.password.bcryptlength);
  if (!data.password) {
    data.password = utils.password.encrypt(
      config.password.default, salt);
  } else {
    data.password = utils.password.encrypt(
      data.password, salt);
  }
  const width = config.avatar.width;
  const avatar = yield utils.avatar.generate(uuid.v1(),
    gender ? 'female' : 'male', width);
  data.avatar = avatar;
  yield models.user.create(data);
};

if (!username) {
  throw new Error('please input username');
}

co(createUser({
  username: username,
  is_admin: admin,
  gender: gender,
  realname: realname,
  aliasname: aliasname,
  email: email,
  mobile: mobile,
}));
