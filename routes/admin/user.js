/*
 * @Author: detailyang
 * @Date:   2016-03-07 19:59:56
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-10 16:54:08
 */
import koarouter from 'koa-router';
import sequelize from 'sequelize';
import uuid from 'uuid';

import models from '../../models';
import config from '../../config';
import utils from '../../utils';


const router = koarouter({
  prefix: '/admin/users',
});
module.exports = router;

router.get('/', async(ctx) => {
  let isdelete = ctx.request.query['is_delete[]'] || [];
  const keyword = ctx.request.query.keyword || '';
  const where = {};

  if (isdelete.length > 0) {
    if (!(isdelete instanceof Array)) {
      isdelete = [isdelete];
    }
    where.is_delete = {
      $in: isdelete,
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
    throw new utils.error.NotFoundError('dont found users');
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
});

router.post('/', async(ctx) => {
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
});

router.get('/:id(\\d+)', async(ctx) => {
  const user = await models.user.findOne({
    attributes: ['id', 'username', 'chinesename', 'aliasname',
                 'mobile', 'email', 'key', 'is_delete'],
    where: {
      id: ctx.params.id,
    },
  });

  if (!user) {
    throw new utils.error.NotFoundError('dont found user');
  }
  ctx.return.data.value = user;
  ctx.body = ctx.return;
});

router.delete('/:id(\\d+)', async(ctx) => {
  const user = await models.user.update({
    is_delete: true,
  }, {
    where: {
      id: ctx.params.id,
    },
  });
  if (!user.length) {
    throw new utils.error.ServerError('delete user error');
  }
  ctx.body = ctx.return;
});

router.put('/:id(\\d+)/staticpassword', async(ctx) => {
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
});

router.put('/:id(\\d+)', async(ctx) => {
  // id username password should not be changed
  delete ctx.request.body.username;
  delete ctx.request.body.password;
  delete ctx.request.body.id;
  const user = await models.user.update(ctx.request.body, {
    where: {
      id: ctx.params.id,
    },
  });
  if (!user) {
    throw new utils.error.ServerError('update user error');
  }
  ctx.body = ctx.return;
});
