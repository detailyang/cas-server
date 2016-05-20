/*
 * @Author: detailyang
 * @Date:   2016-02-29 10:18:29
* @Last modified by:   detailyang
* @Last modified time: 2016-05-06T23:33:41+08:00
 */
import uuid from 'uuid';
import sequelize from 'sequelize';

import models from '../../models';
import utils from '../../utils';


module.exports = {
  async get(ctx) {
    const keyword = ctx.request.query.keyword || '';
    const where = {
      is_delete: 0,
    };

    if (keyword.length > 0) {
      where.$or = [{
        name: {
          $like: `%${keyword}%`,
        },
      }, {
        secret: {
          $like: `%${keyword}%`,
        },
      }];
    }

    // it's not necessary to await in parallel for performance
    const ocs = await models.oauth.findAll({
      attributes: ['id', 'name', 'secret', 'identify', 'domain', 'type',
                   'desc', 'callback', 'is_admin', 'callback_debug'],
      where: where,
      offset: (ctx.request.page - 1) * ctx.request.per_page,
      limit: ctx.request.per_page,
    });
    if (!ocs) {
      throw new utils.error.NotFoundError('dont find oauths');
    }
    const count = await models.oauth.findOne({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      where: where,
    });
    ctx.return.data = {
      value: ocs,
      total: count.dataValues.count,
      per_page: ctx.request.per_page,
      page: ctx.request.page,
    };
    ctx.body = ctx.return;
  },

  async post(ctx) {
    ctx.request.body.secret = uuid.v4();
    ctx.request.body.identify = uuid.v4();
    const oc = await models.oauth.create(ctx.request.body);
    if (!oc) {
      throw new utils.error.ServerError('create oauth error');
    }
    ctx.body = ctx.return;
  },

  id: {
    async get(ctx) {
      const oc = await models.oauth.findOne({
        where: {
          id: ctx.params.id,
        },
      });
      ctx.return.data.value = oc;
      ctx.body = ctx.return;
    },

    async delete(ctx) {
      const oc = await models.oauth.update({
        is_delete: true,
      }, {
        where: {
          id: ctx.params.id,
        },
      });
      if (!oc) {
        throw new utils.error.ServerError('delete oauth error');
      }
      ctx.body = ctx.return;
    },

    async put(ctx) {
      delete ctx.request.body.secret;
      delete ctx.request.identify;
      const oc = await models.oauth.update(ctx.request.body, {
        where: {
          id: ctx.params.id,
        },
      });
      if (!oc) {
        throw new utils.error.ServerError('create oauth error');
      }
      ctx.body = ctx.return;
    },
  },
};
