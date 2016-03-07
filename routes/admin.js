/*
* @Author: detailyang
* @Date:   2016-03-07 19:59:56
* @Last Modified by:   detailyang
* @Last Modified time: 2016-03-07 20:00:09
*/

'use strict';
const router = require('koa-router')({
    prefix: '/admin/users'
})
const sequelize = require('sequelize')
const models = require('../models')
const config = require('../config')
const utils = require('../utils')
module.exports = router

router.get('/', async (ctx, next) => {
    const where = {
        is_delete: false
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
    }
    ctx.body = ctx.return
})

router.post('/', async (ctx, next) => {
    var salt = utils.password.genSalt(15)
    if (!ctx.request.body.password) {
        ctx.request.body.password = utils.password.encrypt(
            config.password.default, salt)
    } else {
        ctx.request.body.password = utils.password.encrypt(
            ctx.request.body.password, salt)
    }
    const user = await models['user'].create(ctx.request.body)
    ctx.return['data'] = {
        value: null
    }
    ctx.body = ctx.return
})

router.get('/:id(\\d+)', async (ctx, next) => {
    const user = await models['user'].findOne({
        attributes: ['id', 'username', 'chinesename', 'aliasname', 'mobile', 'email', 'key'],
        where: {
            is_delete: false,
            id: ctx.params.id
        }
    })

    ctx.return['data']['value'] = user
    ctx.body = ctx.return
})

router.delete('/:id(\\d+)', async (ctx, next) => {
    const user = await models['user'].update({
        is_delete: true
    }, {
        where: {
            id: ctx.params.id
        }
    })
    ctx.body = ctx.return
})

router.put('/:id(\\d+)', async (ctx, next) => {
    delete ctx.request.body.username
    if (ctx.request.body.password) {
        var salt = utils.password.genSalt(12)
        ctx.request.body.password = utils.password.encrypt(
            ctx.request.body.password, salt)
    }
    const user = await models['user'].update(ctx.request.body, {
        where: {
            id: ctx.params.id
        }
    })
    ctx.body = ctx.return
})
