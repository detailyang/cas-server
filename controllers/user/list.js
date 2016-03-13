/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T02:41:52+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T21:27:35+08:00
* @License: The MIT License (MIT)
*/
import sequelize from 'sequelize';
import uuid from 'uuid';

import models from '../../models';
import config from '../../config';
import utils from '../../utils';


module.exports = {
  async get(ctx) {
    let is_delete = ctx.request.query['is_delete[]'] || [];
    const keyword = ctx.request.query.keyword || '';
    const where = {};

    if (is_delete.length > 0) {
      if (!(is_delete instanceof Array)) {
        is_delete = [is_delete];
      }
      where.is_delete = {
        $in: is_delete,
      };
    }
    if (keyword.length > 0) {
      where.$or = [{
        username: {
          $like: `%${keyword}%`,
        },
      }, {
        chinesename: {
          $like: `%${keyword}%`,
        },
      }, {
        aliasname: {
          $like: `%${keyword}%`,
        },
      }];
    }

    // it's not necessary to await in parallel for performance
    const users = await models.user.findAll({
      attributes: ['id', 'username', 'chinesename', 'aliasname',
                   'mobile', 'email', 'is_delete'],
      where: where,
      offset: (ctx.request.page - 1) * ctx.request.per_page,
      limit: ctx.request.per_page,
    });
    if (!users.length) {
      throw new utils.error.NotFoundError('dont find users');
    }

    if (!users) throw new utils.error.NotFoundError();
    const count = await models.user.findOne({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      where: where,
    });
    ctx.return.data = {
      value: users,
      total: count.dataValues.count,
      per_page: ctx.request.per_page,
      page: ctx.request.page,
    };
    ctx.body = ctx.return;
  },

  async post(ctx) {
    const salt = utils.password.genSalt(config.password.bcryptlength);

    if (!ctx.request.body.password) {
      ctx.request.body.password = utils.password.encrypt(
        config.password.default, salt);
    } else {
      ctx.request.body.password = utils.password.encrypt(
        ctx.request.body.password, salt);
    }
    const width = ctx.request.query.width || config.avatar.width;
    const avatar = await utils.avatar.generate(uuid.v1(),
      ctx.request.gender ? 'female' : 'male', width);

    ctx.request.body.avatar = avatar;
    const user = await models.user.create(ctx.request.body);
    if (!user) {
      throw new utils.error.ServerError('create user error');
    }
    ctx.body = ctx.return;
  },

  id: {
    async get(ctx) {
      const user = await models.user.findOne({
        attributes: ['id', 'username', 'chinesename', 'aliasname',
                     'mobile', 'email', 'key', 'is_delete'],
        where: {
          id: ctx.params.id,
        },
      });

      if (!user) {
        throw new utils.error.NotFoundError('dont find user');
      }
      ctx.return.data.value = user;
      ctx.body = ctx.return;
    },

    async delete(ctx) {
      const user = await models.user.update({
        is_delete: true,
      }, {
        where: {
          is_delete: false,
          id: ctx.params.id,
        },
      });
      if (!user[0]) {
        throw new utils.error.NotFoundError('not found user');
      }
      ctx.body = ctx.return;
      ctx.queue.add({
        event: 'user.offline',
        value: {
          id: ctx.params.id,
        },
      });
    },

    async put(ctx) {
      const is_delete = ctx.request.body.is_delete;
      // id username password should not be changed
      delete ctx.request.body.username;
      delete ctx.request.body.password;
      delete ctx.request.body.id;
      const user = await models.user.update(ctx.request.body, {
        where: {
          id: ctx.params.id,
        },
      });
      if (!user[0]) {
        throw new utils.error.NotFoundError('not found user');
      }
      ctx.body = ctx.return;
      ctx.queue.add({
        event: +is_delete ? 'user.offline' : 'user.online',
        value: {
          id: ctx.params.id,
        },
      });
    },

    staticpassword: {
      async put(ctx) {
        if (!ctx.request.body.reset) {
          throw new utils.error.ParamsError('lack reset param');
        }

        const salt = utils.password.genSalt(config.password.bcryptlength);
        ctx.request.body.password = utils.password.encrypt(config.password.default, salt);
        const user = await models.user.update({ password: ctx.request.body.password }, {
          where: {
            id: ctx.params.id,
          },
        });
        if (!user) {
          throw new utils.error.ServerError('update static password error');
        }
        ctx.body = ctx.return;
      },
    },
  },
};
