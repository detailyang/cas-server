/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:06:56+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-17T12:24:35+08:00
* @License: The MIT License (MIT)
*/


import uuid from 'uuid';

import models from '../../models';
import utils from '../../utils';
import config from '../../config';


module.exports = {
  authorize: {
    async get(ctx) {
      const name = ctx.request.query.name;
      if (!ctx.session || !ctx.session.id) {
        return ctx.redirect(`/public/oauth?name=${name}`);
      }

      return await ctx.render('authorize.html');
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
        throw new utils.error.NotFoundError('dont find oauth');
      }
      const code = uuid.v4();
      const rv = await ctx.redis.setex(`${name}:${code}`, config.oauth.ttl,
        JSON.stringify({
          id: ctx.session.id,
          username: ctx.session.username,
        })
      );
      if (!rv) {
        throw new utils.error.ServerError('save code error');
      }
      const callback = `${oc.callback}?code=${code}`;
      ctx.return.data.value = callback;
      ctx.body = ctx.return;
    },
  },

  oauth: {
    async get(ctx) {
      const name = ctx.request.query.name || '';
      if (ctx.session && ctx.session.id) {
        return ctx.redirect(`/public/oauth/authorize?name=${name}`);
      }
      await ctx.render('oauth.html');
      return true;
    },

    async getUser(ctx) {
      const code = ctx.request.query.code;
      const rv = await ctx.redis.get(`${name}:${code}`);
      if (!rv) {
        throw new utils.error.NotFoundError('dont find users');
      }
      const user = JSON.parse(rv);
      ctx.return.data.value = user;
      ctx.body = ctx.return;
    },
  },
};
