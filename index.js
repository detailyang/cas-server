/*
 * @Author: detailyang
 * @Date:   2016-02-17 15:18:34
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-10 20:00:28
 */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import middlewares from './middlewares';
import routes from './routes';

let app = new Koa();
if (process.env.NODE_ENV === 'dev') {
    app.use(middlewares.webpack);
}
app.use(middlewares.error);
app.use(middlewares.log);
app.use(middlewares.return);
app.use(middlewares.session);
// use acl
app.use(middlewares.acl);
app.use(bodyParser());
app.use(middlewares.page);
app.use(middlewares.view);
app.use(middlewares.index);

app.use(routes.admin.user.routes());
app.use(routes.admin.oauth.routes());
app.use(routes.api.user.routes());
app.use(routes.public.user.routes());

app.listen(3000, () => {
    console.log('server listen 3000');
});
