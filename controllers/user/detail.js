/*
 * @Author: detailyang
 * @Date:   2016-02-29 14:32:13
* @Last modified by:   detailyang
* @Last modified time: 2016-03-16T16:48:02+08:00
 */
import fs from 'fs';
import zxcvbn from 'zxcvbn';

import models from '../../models';
import utils from '../../utils';
import config from '../../config';


module.exports = {
  async login(ctx) {
    const id = ctx.request.body.id;
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const dynamic = ctx.request.body.dynamic;
    const staticdynamic = ctx.request.body.staticdynamic || '';

    if (!password || !(username || id)) {
      throw new utils.error.ParamsError('lack username or password');
    }
    const where = {
      is_delete: false,
    };

    if (username) {
      where.username = username;
    }
    if (id) {
      where.id = id;
    }

    const user = await models.user.findOne({
      attributes: ['id', 'password', 'is_admin'],
      where: where,
    });
    if (!user) {
      throw new utils.error.NotFoundError(`no username: ${ctx.request.body.username}`);
    }

    if (dynamic) {
      if (staticdynamic) {
        const _dynamic = staticdynamic.slice(-6);
        const _static = staticdynamic.slice(0, -6);
        const rv = utils.password.otpcheck(_dynamic, utils.password.encrypt(
          user.username + user.password, config.notp.salt));
        if (!rv) {
          throw new utils.error.ParamsError('optcode not right');
        } else {
          if (rv.delta < config.notp.delta) {
            throw new utils.error.ParamsError('optcode not right');
          }
        }

        if (utils.password.check(_static, user.dataValues.password)) {
          const value = {
            'id': user.id,
            'username': ctx.request.body.username,
            'is_admin': user.is_admin,
            'gender': user.gender,
          };
          ctx.return.data.value = ctx.session = value;
          ctx.body = ctx.return;
          return;
        }
      } else {
        const rv = utils.password.otpcheck(ctx.request.password, utils.password.encrypt(
          user.username + user.password, config.notp.salt));
        if (!rv) {
          throw new utils.error.ParamsError('optcode not right');
        } else {
          if (rv.delta < config.notp.delta) {
            throw new utils.error.ParamsError('optcode not right');
          }
        }
      }
    } else {
      if (utils.password.check(ctx.request.body.password, user.dataValues.password)) {
        const value = {
          'id': user.id,
          'username': ctx.request.body.username,
          'is_admin': user.is_admin,
          'gender': user.gender,
        };
        ctx.return.data.value = ctx.session = value;
        ctx.body = ctx.return;
        return;
      }
      throw new utils.error.ParamsError('password not right');
    }
  },

  async logout(ctx) {
    ctx.session = {};
    ctx.body = ctx.return;
  },

  async get(ctx) {
    const user = await models.user.findOne({
      attributes: ['id', 'username', 'is_admin', 'gender', 'password',
                   'realname', 'is_delete', 'aliasname', 'mobile', 'email', 'key'],
      where: {
        is_delete: false,
        id: ctx.session.id,
      },
    });
    if (!user) {
      throw new utils.error.NotFoundError('dont find user');
    }
    user.dataValues.notp = utils.password.otpqrcode(
      utils.password.encrypt(
        user.username + user.password, config.notp.salt),
      config.notp.label);
    delete user.dataValues.password;
    ctx.return.data.value = user;
    ctx.body = ctx.return;
  },

  async filter(ctx) {
    const field = ctx.request.query.field;
    const value = ctx.request.query.value;
    const where = { is_delete: false };
    if (field && value) {
      where[field] = value;
    }
    const user = await models.user.findAll({
      attributes: ['id', 'username', 'gender',
                   'realname', 'aliasname', 'mobile', 'email', 'key'],
      where: where,
    });
    if (!user) {
      throw new utils.error.NotFoundError('dont find user');
    }

    ctx.return.data.value = user;
    ctx.body = ctx.return;
  },

  async getOne(ctx) {
    const field = ctx.request.query.field;
    const value = ctx.request.query.value;
    const where = { is_delete: false };
    if (field && value) {
      where[field] = value;
    }
    const user = await models.user.findOne({
      attributes: ['id', 'username', 'gender',
                   'realname', 'aliasname', 'mobile', 'email', 'key'],
      where: where,
    });
    if (!user) {
      throw new utils.error.NotFoundError('dont find user');
    }

    ctx.return.data.value = user;
    ctx.body = ctx.return;
  },

  async put(ctx) {
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
  },

  avatar: {
    async get(ctx) {
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
    },

    async getByUsername(ctx) {
      const username = ctx.params.username;
      const user = await models.user.findOne({
        attributes: ['avatar'],
        where: {
          // is_delete: false, even if it's deleted:)
          username: username,
        },
      });
      if (!user) {
        throw new utils.error.NotFoundError('dont find user');
      }

      ctx.response.set('Content-Type', 'image/jpeg');
      ctx.response.set('Cache-Control', `public, max-age=${config.avatar.cache}`);
      ctx.body = user.avatar;
    },

    async post(ctx) {
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
    },
  },

  dynamicpassword: {
    async post(ctx) {
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
    },
  },
  staticpassword: {
    async put(ctx) {
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
        throw new utils.error.NotFoundError('dont find user');
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
    },
  },
};
