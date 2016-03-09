/*
* @Author: detailyang
* @Date:   2016-02-29 10:18:29
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-09 16:58:15
*/

'use strict';
import koarouter from "koa-router";
import sequelize from "sequelize";
import uuid from "uuid";

import models from "../../models";
import config from "../../config";
import utils from "../../utils";


const router = koarouter({
    prefix: '/admin/oauths'
})
module.exports = router

router.get('/', async (ctx, next) => {
    const keyword = ctx.request.query.keyword;
    const where = {
        is_delete: 0
    };

    if (keyword.length > 0) {
       where['$or'] = [
            {
                name: {
                    $like: `%${keyword}%`
                },
            },
            {
                secret: {
                    $like: `%${keyword}%`
                },
            },
       ];
    }

    // it's not necessary to await in parallel for performance
    const ocs = await models['oauth'].findAll({
        attributes: ['id', 'name', 'secret', 'domain', 'desc', 'callback_url', 'is_admin'],
        where: where,
        offset: (ctx.request.page - 1) * ctx.request.per_page,
        limit: ctx.request.per_page
    })
    const count = await models['oauth'].findOne({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
        where: where
    })
    ctx.return['data'] = {
        value: ocs,
        total: count.dataValues.count,
        per_page: ctx.request.per_page,
        page: ctx.request.page
    }
    ctx.body = ctx.return
})

router.post('/', async (ctx, next) => {
    ctx.request.body.secret = uuid.v1()
    const oc = await models['oauth'].create(ctx.request.body)
    ctx.return['data'] = {
        value: null
    }
    ctx.body = ctx.return
})

router.put('/', async (ctx, next) => {
    delete request.body.secret
    const oc = await models['oauth'].create(ctx.request.body)
    ctx.return['data'] = {
        value: null
    }
    ctx.body = ctx.return
})

router.delete('/:id(\\d+)', async (ctx, next) => {
    const oc = await models['oauth'].update({
        is_delete: true
    }, {
        where: {
            id: ctx.params.id
        }
    })
    ctx.body = ctx.return
})

router.get('/:id(\\d+)', async (ctx, next) => {
    const oc = await models['oauth'].findOne({
        where: {
            is_delete: false,
            id: ctx.params.id
        }
    })
    ctx.return['data']['value'] = oc
    ctx.body = ctx.return
})

router.put('/:id(\\d+)', async (ctx, next) => {
    delete ctx.request.body.secret
    const user = await models['oauth'].update(ctx.request.body, {
        where: {
            id: ctx.params.id
        }
    })
    ctx.body = ctx.return
})
