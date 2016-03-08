/*
 * @Author: detailyang
 * @Date:   2016-02-18 12:43:02
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-08 14:50:48
 */

'use strict'
import koarouter from "koa-router";
import sequelize from "sequelize";
import models from "../../models";
import config from "../../config";
import utils from "../../utils";


const router = koarouter({
    prefix: '/api/users'
});
module.exports = router;

router.get('/self', async(ctx, next) => {
    if (!ctx.session) {
        ctx.return['data']['value'] = {
            id: 0,
            username: 'nobody',
            is_admin: false
        };
    } else {
        ctx.return['data']['value'] = ctx.session;
    }
    ctx.body = ctx.return;
})
