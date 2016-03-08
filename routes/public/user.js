/*
* @Author: detailyang
* @Date:   2016-02-29 14:32:13
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-08 14:53:53
*/

'use strict';
import koarouter from "koa-router";
import sequelize from "sequelize";
import models from "../../models";
import config from "../../config";
import utils from "../../utils";


const router = koarouter({
    prefix: '/public/users'
});
module.exports = router;

router.post('/login', async (ctx, next) => {
    if (!ctx.request.body.password || !ctx.request.body.username) {
        throw new Error("password or username cannot be null")
    }
    const user = await models['user'].findOne({
        attributes: ['id', 'password', 'is_admin'],
        where: {
            is_delete: false,
            username: ctx.request.body.username
        }
    })
    if (!user) {
        throw new Error(`no username:${ctx.request.body.username}`)
    }
    if (utils.password.check(ctx.request.body.password, user.dataValues.password)) {
        ctx.session = {
            'id': user.id,
            'username': ctx.request.body.username,
            'is_admin': user.is_admin
        }
        ctx.body = ctx.return
    } else {
        throw new Error("password not right")
    }
})

router.post('/logout', async (ctx, next) => {
    ctx.session.user = {}
    ctx.body = ctx.return
})
