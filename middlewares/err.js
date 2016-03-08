/*
* @Author: detailyang
* @Date:   2016-03-08 12:04:19
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-08 13:30:05
*/

'use strict';
import sequelize from "sequelize";
import utils from "../utils";


module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err);
        if (err instanceof sequelize.ValidationError) {
            const errors = [];
            for (let e in err.errors) {
                errors.push({
                    field:err.errors[e].path,
                    msg: err.errors[e].message
                });
            }
            ctx.return['data']['value'] = errors;
        } else if (err instanceof sequelize.DatabaseError
                || err instanceof ReferenceError
                || err instanceof TypeError
                || err instanceof sequelize.ConnectionRefusedError
                || err instanceof sequelize.ConnectionError
            ) {
            // production record log
            ctx.return['code'] = utils.return.getCode('servererror');
            ctx.return['msg'] = utils.return.getMsg('servererror');
            ctx.body = ctx.return;
            return
        } else {
            ctx.return['data']['value'] = err.message;
        }
        ctx.return['code'] = utils.return.getCode('failure');
        ctx.return['msg'] = utils.return.getMsg('failure');
        ctx.body = ctx.return;
    }
}