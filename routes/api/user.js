/*
 * @Author: detailyang
 * @Date:   2016-02-18 12:43:02
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-10 20:28:25
 */
import koarouter from 'koa-router';
import fs from 'fs';
import convert from 'koa-convert';
import koaBody from 'koa-body';
import zxcvbn from 'zxcvbn';

import models from '../../models';
import config from '../../config';
import utils from '../../utils';

const koabody = koaBody({
  multipart: true,
});
const router = koarouter({
  prefix: '/api/users',
});
module.exports = router;

router.get('/self', async(ctx) => {
  const user = await models.user.findOne({
    attributes: ['id', 'username', 'is_admin', 'gender', 'password',
                 'chinesename', 'is_delete', 'aliasname', 'mobile', 'email', 'key'],
    where: {
      is_delete: false,
      id: ctx.session.id,
    },
  });
  if (!user) {
    throw new utils.error.NotFoundError('dont found user');
  }
  user.dataValues.notp = utils.password.otpqrcode(
    utils.password.encrypt(
      user.username + user.password, config.notp.salt),
    config.notp.label);
  delete user.dataValues.password;
  ctx.return.data.value = user;
  ctx.body = ctx.return;
});

router.put('/self', async(ctx) => {
  delete ctx.request.body.username;
  delete ctx.request.body.password;
  delete ctx.request.body.id;
  const user = await models.user.update(ctx.request.body, {
    where: {
      id: ctx.session.id,
    },
  });
  if (!user) {
    throw new utils.error.ServerError('update user error');
  }
  ctx.body = ctx.return;
});

router.get('/self/avatar', async(ctx) => {
  const user = await models.user.findOne({
    attributes: ['avatar'],
    where: {
      is_delete: false,
      id: ctx.session.id,
    },
  });

  ctx.response.set('Content-Type', 'image/jpeg');
  ctx.response.set('Cache-Control', `public, max-age=${config.avatar.cache}`);
  ctx.body = user.avatar;
});


router.post('/self/avatar', convert(koabody), async(ctx) => {
  if (!ctx.request.body.files.avatar) {
    throw new Error('please upload avatar');
  }
  const avatar = ctx.request.body.files.avatar;

  if (avatar.size >= config.avatar.maxsize) {
    throw new Error('avatar too large');
  }
  const buffer = await new Promise((resolve, reject) => {
    fs.readFile(avatar.path, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
  const user = await models.user.update({
    avatar: buffer,
  }, {
    where: {
      id: ctx.session.id,
    },
  });
  if (!user) {
    throw new utils.error.ServerError('update user error');
  }

  await new Promise((resolve, reject) => {
    fs.unlink(avatar.path, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });

  ctx.body = ctx.return;
});

router.post('/self/dynamicpassword', async(ctx) => {
  const dp = ctx.request.body.dynamicpassword;
  const user = await models.user.findOne({
    attributes: ['username', 'password'],
    where: {
      is_delete: false,
      id: ctx.session.id,
    },
  });
  const rv = utils.password.otpcheck(dp, utils.password.encrypt(
    user.username + user.password, config.notp.salt));
  if (!rv) {
    throw new utils.error.ParamsError('optcode not right');
  } else {
    if (rv.delta < config.notp.delta) {
      throw new utils.error.ParamsError('optcode not right');
    }
  }
  ctx.body = ctx.return;
});

router.put('/self/staticpassword', async(ctx) => {
  const oldpassword = ctx.request.body.oldpassword;
  const newpassword = ctx.request.body.newpassword;

  const value = zxcvbn(newpassword);
  if (value.score <= 1) {
    throw new utils.error.ParamsError('password strength is too low');
  }
  const user = await models.user.findOne({
    attributes: ['id', 'password'],
    where: {
      is_delete: false,
      id: ctx.session.id,
    },
  });
  if (!user) {
    throw new utils.error.NotFoundError('dont found user');
  } else {
    if (!utils.password.check(oldpassword, user.password)) {
      throw new utils.error.ParamsError('old password not right');
    }
  }
  const salt = utils.password.genSalt(config.password.bcryptlength);
  await models.user.update({
    password: utils.password.encrypt(newpassword, salt),
  }, {
    where: {
      id: ctx.session.id,
    },
  });
  ctx.body = ctx.return;
});
