/*
 * @Author: detailyang
 * @Date:   2016-03-08 11:56:01
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-08 13:30:20
 */
import utils from '../utils';

module.exports = async(ctx, next) => {
  ctx.return = {
    code: utils.return.getCode('success'),
    msg: utils.return.getMsg('success'),
    data: {
      value: null,
    },
  };
  await next();
};
