/*
* @Author: detailyang
* @Date:   2016-02-29 10:18:29
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-08 14:31:46
*/

'use strict';
const router = require('koa-router')({
    prefix: '/admin/oauth'
})
const sequelize = require('sequelize')
const models = require('../models')
const config = require('../config')
const utils = require('../utils')
const uuid = require('uuid')
module.exports = router

router.get('/clients', async (ctx, next) => {
    const where = {
        is_delete: false
    }

    // it's not necessary to await in parallel for performance
    const ocs = await models['oauth_client'].findAll({
        attributes: ['id', 'name', 'secret', 'domain', 'url', 'is_delete'],
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

router.post('/clients', async (ctx, next) => {
    ctx.request.body.secret = uuid.v1()
    const oc = await models['oauth_client'].create(ctx.request.body)
    ctx.return['data'] = {
        value: null
    }
    ctx.body = ctx.return
})

router.put('/clients', async (ctx, next) => {
    delete request.body.secret
    const oc = await models['oauth_client'].create(ctx.request.body)
    ctx.return['data'] = {
        value: null
    }
    ctx.body = ctx.return
})

router.delete('/clients/:id(\\d+)', async (ctx, next) => {
    const oc = await models['oauth_client'].update({
        is_delete: true
    }, {
        where: {
            id: ctx.params.id
        }
    })
    ctx.body = ctx.return
})
