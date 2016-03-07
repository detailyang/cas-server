/*
 * @Author: detailyang
 * @Date:   2016-02-18 12:43:02
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-07 21:59:25
 */

'use strict'
const router = require('koa-router')({
    prefix: '/api/users'
})
const sequelize = require('sequelize')
const models = require('../models')
const config = require('../config')
const utils = require('../utils')
module.exports = router

router.get('/self', async(ctx, next) => {
    if (!ctx.session) {
        ctx.return['data']['value'] = {
            id: 0,
            username: 'nobody'
        };
    } else {
        ctx.return['data']['value'] = ctx.session;
    }
    ctx.body = ctx.return;
})
