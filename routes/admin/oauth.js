/*
* @Author: detailyang
* @Date:   2016-02-29 10:18:29
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-08 14:49:24
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
    const where = {
        is_delete: false
    }

    // it's not necessary to await in parallel for performance
    const ocs = await models['oauth_client'].findAll({
        attributes: ['id', 'name', 'secret', 'domain', 'callback_url', 'is_delete'],
        where: where,
        offset: (ctx.request.page - 1) * ctx.request.per_page,
        limit: ctx.request.per_page
    })
    const count = await models['user'].findOne({
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
    const oc = await models['oauth_client'].create(ctx.request.body)
    ctx.return['data'] = {
        value: null
    }
    ctx.body = ctx.return
})

router.put('/', async (ctx, next) => {
    delete request.body.secret
    const oc = await models['oauth_client'].create(ctx.request.body)
    ctx.return['data'] = {
        value: null
    }
    ctx.body = ctx.return
})

router.delete('/:id(\\d+)', async (ctx, next) => {
    const oc = await models['oauth_client'].update({
        is_delete: true
    }, {
        where: {
            id: ctx.params.id
        }
    })
    ctx.body = ctx.return
})
