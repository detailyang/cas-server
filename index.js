/*
 * @Author: detailyang
 * @Date:   2016-02-17 15:18:34
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-08 12:55:36
 */

import koa from 'koa';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import config from './config';
import proxy from 'koa-proxy';

import middlewares from './middlewares';
import routes from './routes';

const app = new koa();
if (process.env.NODE_ENV === 'dev') {
    app.use(convert(proxy({
        host: 'http://0.0.0.0:8080/build',
        match: /^\/build\//
    })));
}

app.use(middlewares.error);
app.use(middlewares.log);
app.use(middlewares.session);
app.use(middlewares.return);
app.use(bodyParser());
app.use(middlewares.page);
app.use(middlewares.view);
app.use(middlewares.index);

app.use(routes.admin.routes());
app.use(routes.auth.routes());
app.use(routes.user.routes());
app.use(routes.oauth.routes());

app.listen(3000, () => console.log('server listen 3000'));
