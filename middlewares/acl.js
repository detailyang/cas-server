/*
 * @Author: detailyang
 * @Date:   2016-03-10 17:34:34
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-10 17:35:04
 */
import utils from "../utils";

module.exports = async(ctx, next) => {
  if (ctx.request.path.indexOf('/admin') == 0) {
    if (ctx.session && ctx.session.is_admin) {
      return await next();
    }
    throw new utils.error.PermissionError();
  } else if (ctx.request.path.indexOf('/api') == 0) {
    if (ctx.session && ctx.session.id) {
      return await next();
    }
    throw new utils.error.PermissionError();
  } else if (ctx.request.path.indexOf('/oauth') == 0) {
    ;
  }

  return await next();
};
