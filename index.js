/*
 * @Author: detailyang
 * @Date:   2016-02-17 15:18:34
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-07 21:12:39
 */

import session from "koa-session2";
import Store from "./utils/redis.js";

const koa = require('koa');
const co = require('co');
const bodyParser = require('koa-bodyparser');
const sequelize = require('sequelize');
const config = require('./config');
const utils = require('./utils');
const convert = require('koa-convert');
const koastatic = require('koa-static');
const views = require('koa-views');
const proxy = require('koa-proxy');

const app = new koa();
if (process.env.NODE_ENV === 'dev') {
    app.use(convert(proxy({
      host:'http://0.0.0.0:8080/build',
      match: /^\/build\//
    })));
}

app.use(session({
    store: new Store(config.redis.host, config.redis.port, config.redis.db, config.redis.key)
}));

// inject return
app.use(async (ctx, next) => {
    ctx.return = {
        code: utils.return.getCode('success'),
        msg: utils.return.getMsg('success'),
        data: {
            value: null
        }
    }
    await next();
});

// error handle
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err);
        if (err instanceof sequelize.ValidationError) {
            const errors = [];
            for (let e in err.errors) {
                errors.push({
                    field:err.errors[e].path,
                    msg: err.errors[e].message
                });
            }
            ctx.return['data']['value'] = errors;
        } else if (err instanceof sequelize.DatabaseError
                || err instanceof ReferenceError
                || err instanceof TypeError
                || err instanceof sequelize.ConnectionRefusedError
            ) {
            // production record log
            ctx.return['code'] = utils.return.getCode('servererror');
            ctx.return['msg'] = utils.return.getMsg('servererror');
            ctx.body = ctx.return;
            return
        } else {
            ctx.return['data']['value'] = err.message;
        }
        ctx.return['code'] = utils.return.getCode('failure');
        ctx.return['msg'] = utils.return.getMsg('failure');
        ctx.body = ctx.return;
    }
});

// view
app.use(convert(views(`${__dirname}/views`)))

app.use(async (ctx, next) => {
  ctx.render = co.wrap(ctx.render.bind(ctx))
  await next()
})

// static
app.use(convert(koastatic(`${__dirname}/static`)))

// record log
app.use(async (ctx, next) => {
    const start = new Date;
    await next();
    const ms = new Date - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// body parser
app.use(bodyParser());

// inject paginator
app.use(async (ctx, next) => {
    const page = ctx.query.page || 1;
    const per_page = ctx.query.per_page || config.paginator.per_page;
    ctx.request.page = page;
    ctx.request.per_page = per_page;
    await next();
})

const routes = require('./routes');

// render index html
app.use(async (ctx, next) => {
    if (ctx.request.path == '/') {
       await ctx.render('index.html')
    }
    await next();
})

app.use(routes.admin.routes());
app.use(routes.auth.routes());
app.use(routes.user.routes());
app.use(routes.oauth.routes());

app.listen(3000, () => {
    console.log("server listen 3000");
});
