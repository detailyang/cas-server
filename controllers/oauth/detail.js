/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:06:56+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T23:58:17+08:00
* @License: The MIT License (MIT)
*/


import uuid from 'uuid';

import models from '../../models';
import utils from '../../utils';


module.exports = {
  authorize: {
    async get(ctx) {
      if (!ctx.session || !ctx.session.id) {
        return ctx.redirect('/public/oauth');
      }
      const name = ctx.request.query.name;
      const oc = await models.oauth.findOne({
        attribute: ['id', 'callback'],
        where: {
          is_delete: false,
          name: name,
        },
      });

      await ctx.render('authorize.html');
      return true;
    },

    async post(ctx) {
      if (!ctx.session || !ctx.session.id) {
        throw new utils.error.PermissionError('you havent login');
      }
      const name = ctx.request.query.name;
      const oc = await models.oauth.findOne({
        attribute: ['id', 'callback'],
        where: {
          is_delete: false,
          name: name,
        },
      });

      if (!oc) {
        throw new utils.error.NotFoundError('dont found oauth');
      }
      const code = uuid.v4();
      const callback = `${oc.callback}?code=${code}`;
      ctx.return.data.value = callback;
      ctx.body = ctx.return;
    },
  },

  async oauth(ctx) {
    await ctx.render('oauth.html');
    return true;
  },
};
