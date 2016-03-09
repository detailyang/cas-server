/*
 * @Author: detailyang
 * @Date:   2016-02-18 12:43:02
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-09 19:41:43
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
        attributes: ['id', 'username', 'chinesename', 'is_delete', 'aliasname', 'mobile', 'email', 'key'],
        where: {
            is_delete: false,
            id: ctx.session.id
        }
    })
    ctx.return['data']['value'] = user
    ctx.body = ctx.return;
})
