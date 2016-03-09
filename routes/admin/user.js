/*
* @Author: detailyang
* @Date:   2016-03-07 19:59:56
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-09 17:24:26
*/

'use strict';
import koarouter from "koa-router";
import sequelize from "sequelize";
import models from "../../models";
import config from "../../config";
import utils from "../../utils";


const router = koarouter({
    prefix: '/admin/users'
});
module.exports = router;

router.get('/', async (ctx, next) => {
    let is_delete = ctx.request.query['is_delete[]'] || [];
    const keyword = ctx.request.query.keyword;
    const where = {};

    if (is_delete.length > 0) {
        if (!(is_delete instanceof Array)) {
            is_delete = [is_delete];
        }
        where['is_delete'] = {
            $in: is_delete
        }
    }
    if (keyword.length > 0) {
       where['$or'] = [
            {
                username: {
                    $like: `%${keyword}%`
                },
            },
            {
                chinesename: {
                    $like: `%${keyword}%`
                },
            },
            {
                aliasname: {
                    $like: `%${keyword}%`
                },
            },
       ];
    }

    // it's not necessary to await in parallel for performance
    const users = await models['user'].findAll({
        attributes: ['id', 'username', 'chinesename', 'aliasname', 'mobile', 'email', 'is_delete'],
        where: where,
        offset: (ctx.request.page - 1) * ctx.request.per_page,
        limit: ctx.request.per_page
    })
    const count = await models['user'].findOne({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
        where: where
    })
    ctx.return['data'] = {
        value: users,
        total: count.dataValues.count,
        per_page: ctx.request.per_page,
        page: ctx.request.page
    };
    ctx.body = ctx.return;
})

router.post('/', async (ctx, next) => {
    var salt = utils.password.genSalt(config.password.bcryptlength)
    if (!ctx.request.body.password) {
        ctx.request.body.password = utils.password.encrypt(
            config.password.default, salt)
    } else {
        ctx.request.body.password = utils.password.encrypt(
            ctx.request.body.password, salt)
    }
    const user = await models['user'].create(ctx.request.body);
    ctx.body = ctx.return;
})

router.get('/:id(\\d+)', async (ctx, next) => {
    const user = await models['user'].findOne({
        attributes: ['id', 'username', 'chinesename', 'aliasname', 'mobile', 'email', 'key', 'is_delete'],
        where: {
            id: ctx.params.id
        }
    })

    ctx.return['data']['value'] = user;
    ctx.body = ctx.return;
})

router.delete('/:id(\\d+)', async (ctx, next) => {
    const user = await models['user'].update({
        is_delete: true
    }, {
        where: {
            id: ctx.params.id
        }
    })
    ctx.body = ctx.return;
})

router.put('/:id(\\d+)', async (ctx, next) => {
    if (!ctx.request.body.reset) {
        return;
    }
    var salt = utils.password.genSalt(config.password.bcryptlength);
    ctx.request.body.password = utils.password.encrypt(config.password.default, salt)
    const user = await models['user'].update(ctx.request.body, {
        where: {
            id: ctx.params.id
        }
    });
    ctx.body = ctx.return;
})
