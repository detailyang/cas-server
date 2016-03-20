/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-13T22:06:56+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-20T16:06:14+08:00
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
      const debug = ctx.request.query.debug;
      if (!ctx.session || !ctx.session.id) {
        if (debug) {
          return ctx.redirect(`/public/oauth?name=${name}&debug=${debug}`);
        }
        return ctx.redirect(`/public/oauth?name=${name}`);
      }

      return await ctx.render('authorize.html');
    },

    async post(ctx) {
      if (!ctx.session || !ctx.session.id) {
        throw new utils.error.PermissionError('you havent login');
      }
      const name = ctx.request.query.name;
      const debug = ctx.request.query.debug;
      const oc = await models.oauth.findOne({
        attribute: ['id', 'callback', 'callback_debug'],
        where: {
          is_delete: false,
          name: name,
        },
      });

      if (!oc) {
        throw new utils.error.NotFoundError('dont find oauth');
      }

      const user = await models.user.findOne({
        attribute: ['id', 'username', 'gender', 'realname', 'aliasname', 'mobile',
                    'email'],
        where: {
          is_delete: false,
          id: ctx.session.id,
        },
      });
      if (!user) {
        throw new utils.error.NotFoundError('dont find user');
      }

      const code = uuid.v4();
      const rv = await ctx.redis.setex(`${name}:${code}`, config.oauth.ttl,
        JSON.stringify({
          id: ctx.session.id,
          username: ctx.session.username,
          gender: user.gender,
          realname: user.realname,
          aliasname: user.aliasname,
          mobile: user.mobile,
          email: user.email,
        })
      );
      if (!rv) {
        throw new utils.error.ServerError('save code error');
      }
      let callback = `${oc.callback}`;
      if (debug) {
        callback = `${oc.callback_debug}`;
      }

      if (callback.includes('?')) {
        callback += `&code=${code}`;
      } else {
        callback += `?code=${code}`;
      }
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
      const name = ctx.oauth.name;
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
