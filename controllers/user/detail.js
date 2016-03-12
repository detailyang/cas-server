/*
 * @Author: detailyang
 * @Date:   2016-02-29 14:32:13
* @Last modified by:   detailyang
* @Last modified time: 2016-03-13T02:45:00+08:00
 */

import models from '../../models';
import utils from '../../utils';


module.exports = {
  async login(ctx) {
    if (!ctx.request.body.password || !ctx.request.body.username) {
      throw new utils.error.ParamsError('lack username or password');
    }
    const user = await models.user.findOne({
      attributes: ['id', 'password', 'is_admin'],
      where: {
        is_delete: false,
        username: ctx.request.body.username,
      },
    });
    if (!user) {
      throw new utils.error.NotFoundError(`no username: ${ctx.request.body.username}`);
    }

    if (utils.password.check(ctx.request.body.password, user.dataValues.password)) {
      const value = {
        'id': user.id,
        'username': ctx.request.body.username,
        'is_admin': user.is_admin,
        'gender': user.gender,
      };
      ctx.return.data.value = ctx.session = value;
      ctx.body = ctx.return;
    } else {
      throw new utils.error.ParamsError('password not right');
    }
  },

  async logout(ctx) {
    ctx.session = {};
    ctx.body = ctx.return;
  },
};
