/*
 * @Author: detailyang
 * @Date:   2016-03-08 12:04:19
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-08 17:22:20
 */

import sequelize from 'sequelize';
import utils from '../utils';

module.exports = async(ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof sequelize.ValidationError) {
      const errors = {};
      for (const e in err.errors) {
        if (!err.errors.hasOwnProperty(e)) continue;
        errors[err.errors[e].path] = err.errors[e].message;
      }
      ctx.return.data.errors = errors;
      ctx.return.code = utils.return.getCode('failure');
      ctx.return.msg = utils.return.getMsg('failure');
      ctx.body = ctx.return;
      return;
    } else if (err instanceof sequelize.DatabaseError
            || err instanceof sequelize.ConnectionRefusedError
            || err instanceof sequelize.ConnectionError) {
      // production record log
      conosle.log(err);
      ctx.return.code = utils.return.getCode('servererror');
      ctx.return.msg = utils.return.getMsg('servererror');
      ctx.body = ctx.return;
      return;
    } else if (err instanceof utils.error.PermissionError) {
      ctx.return.code = utils.return.getCode('permission');
      ctx.return.msg = utils.return.getMsg('permission');
      ctx.return.data.value = err.message;
      ctx.body = ctx.return;
      return;
    } else if (err instanceof utils.error.NotFoundError) {
      ctx.return.code = utils.return.getCode('notfound');
      ctx.return.msg = utils.return.getMsg('notfound');
      ctx.return.data.value = err.message;
      ctx.body = ctx.return;
      return;
    } else if (err instanceof utils.error.ParamsError) {
      ctx.return.code = utils.return.getCode('param');
      ctx.return.msg = utils.return.getMsg('param');
      ctx.return.data.value = err.message;
      ctx.body = ctx.return;
      return;
    }
    throw err;
  }
};
