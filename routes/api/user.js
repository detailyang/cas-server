/*
 * @Author: detailyang
 * @Date:   2016-02-18 12:43:02
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-10 15:58:12
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
    const user = await models['user'].findOne({
        attributes: ['id', 'username', 'password', 'chinesename', 'is_delete', 'aliasname', 'mobile', 'email', 'key'],
        where: {
            is_delete: false,
            id: ctx.session.id
        }
    });
    user.dataValues.notp = utils.password.otpqrcode(
        utils.password.encrypt(
            user.username+user.password, config.notp.salt),
        config.notp.label);
    ctx.return['data']['value'] = user
    ctx.body = ctx.return;
})

router.put('/self', async(ctx, next) => {
    const oldpassword = ctx.request.body.oldpassword;
    const newpassword = ctx.request.body.newpassword;

    const user = await models['user'].findOne({
        attributes: ['id', 'password'],
        where: {
            is_delete: false,
            id: ctx.session.id
        }
    });
    if (!user) {
        ctx.return['code'] = utils.return.getCode('notfound')
        ctx.return['msg'] = utils.return.getMsg('notfound')
        ctx.body = ctx.return;
        return
    } else {
        if (!utils.password.check(oldpassword, user.password)) {
            ctx.return['code'] = utils.return.getCode('unauthorized')
            ctx.return['msg'] = utils.return.getMsg('unauthorized')
            ctx.body = ctx.return;
            return
        }
    }
    const salt = utils.password.genSalt(config.password.bcryptlength);
    await models['user'].update({
        password: utils.password.encrypt(newpassword, salt)
    }, {
        where: {
            id: ctx.session.id
        }
    })
    ctx.body = ctx.return;
})

router.get('/self/pw', async(ctx, next) => {
    const user = await models['user'].findOne({
        attributes: ['id', 'username', 'chinesename', 'is_delete', 'aliasname', 'mobile', 'email', 'key'],
        where: {
            is_delete: false,
            id: ctx.session.id
        }
    });
    ctx.return['data']['value'] = user;
    ctx.body = ctx.return;
})

router.get('/self/avatar', async(ctx, next) => {
    const user = await models['user'].findOne({
        attributes: ['avatar'],
        where: {
            is_delete: false,
            id: ctx.session.id
        }
    });

    ctx.response.set('Content-Type', 'image/jpeg');
    ctx.response.set(`Cache-Control', 'public, max-age=${config.avatar.cache}`);
    ctx.body = user.avatar;
})

router.post('/self/dynamic', async(ctx, next) => {
    const dp = ctx.request.body.dynamicpassword;
    const user = await models['user'].findOne({
        attributes: ['username', 'password'],
        where: {
            is_delete: false,
            id: ctx.session.id
        }
    });
    var rv = utils.password.otpcheck(dp,  utils.password.encrypt(
            user.username+user.password, config.notp.salt));
    if (!rv) {
            ctx.return['code'] = utils.return.getCode('unauthorized');
            ctx.return['msg'] = utils.return.getMsg('unauthorized');
    } else {
        if (rv.delta < config.notp.delta) {
            ctx.return['code'] = utils.return.getCode('unauthorized');
            ctx.return['msg'] = utils.return.getMsg('unauthorized');
        }
    }
    ctx.body = ctx.return;
})